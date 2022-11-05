import * as bcrypt from 'bcrypt';
import { H3Event } from "h3";
import JWT from "jsonwebtoken";
import type { User } from "@/server/prisma"
import prisma from "@/server/prisma";
import { ValidationError, UnauthorizedError } from "@/contracts/errors";
import { UserRequest, SessionRequest } from "@/contracts";

export default class AuthService {
	static encryptPassword(password: string): Promise<string> {
		return bcrypt.hash(password, 10);
	}

	static setAuthToken(event: H3Event, user: User): void {
		const {JWT_SECRET} = useRuntimeConfig();

		const authToken = JWT.sign({id: user.id, salt: Math.random()}, JWT_SECRET, {expiresIn: '1d'});

		setCookie(event, 'session', authToken, {httpOnly: true});
	}

	static getCurrentUserId(event: H3Event): string | undefined {
		const {JWT_SECRET} = useRuntimeConfig();

		const authToken = getCookie(event, 'session');

		if(!authToken) {
			return undefined;
		}

		const {id} = JWT.verify(authToken, JWT_SECRET) as {id: string};

		return id;
	}

	static async login(event: H3Event, {username, password}: SessionRequest): Promise<User> {
		const user = await prisma.user.findFirst({ where: { username } });

		if(!user) {
			throw new UnauthorizedError('Invalid credentials');
		}

		const isValidPassword = await bcrypt.compare(password, user.password);

		if(!isValidPassword) {
			throw new UnauthorizedError('Invalid credentials');
		}

		this.setAuthToken(event, user);

		return user;
	}

	static logout(event: H3Event): void {
		setCookie(event, 'session', undefined, {httpOnly: true});
	}
}
