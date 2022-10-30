import * as bcrypt from 'bcrypt';
import { H3Event } from "h3";
import JWT from "jsonwebtoken";
import type { User, Prisma } from "@/server/prisma"
import prisma from "@/server/prisma";
import { ValidationError, UnauthorizedError } from "@/errors";
import { SessionRequest } from "@/contracts";

export default class AuthService {
	static encryptPassword(password: string): Promise<string> {
		return bcrypt.hash(password, 10);
	}

	private static setAuthToken(event: H3Event, user: User): void {
		const {JWT_SECRET} = useRuntimeConfig();

		const authToken = JWT.sign({id: user.id, salt: Math.random()}, JWT_SECRET, {expiresIn: '1d'});

		setCookie(event, 'session', authToken, {httpOnly: true});
	}

	static async register(event: H3Event, input: Prisma.UserCreateInput): Promise<User> {
		if( await prisma.user.findFirst({ where: { email: input.email } })) {
			throw new ValidationError({email: 'User already exists'});
		}

		const password = await this.encryptPassword(input.password);

		const user = await prisma.user.create({data: {...input, password}});

		this.setAuthToken(event, user);

		return user;
	}

	static async login(event: H3Event, {email, password}: SessionRequest): Promise<User> {
		const user = await prisma.user.findFirst({ where: { email } });

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

	static async restoreSession(event: H3Event): Promise<User> {
		const {JWT_SECRET} = useRuntimeConfig();

		const authToken = getCookie(event, 'session');

		if(!authToken) {
			throw new UnauthorizedError('Not logged in');
		}

		const {id} = JWT.verify(authToken, JWT_SECRET) as {id: string};

		const user = await prisma.user.findFirst({ where: { id } });

		if(!user) {
			throw new UnauthorizedError('Not logged in');
		}

		return user;
	}

	static async logout(event: H3Event): Promise<void> {
		setCookie(event, 'session', undefined, {httpOnly: true});
	}
}
