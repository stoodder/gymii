import * as bcrypt from 'bcrypt';
import { H3Event } from "h3";
import JWT from "jsonwebtoken";
import type { User } from "@/server/prisma"
import prisma from "@/server/prisma";
import { SessionRequest } from "@/contracts";
import { setCookie, getCookie } from "h3";

if(process.client) {
	throw new Error("Not allowed to import AuthService on client");
}

export default class AuthService {
	static encryptPassword(password: string): Promise<string> {
		return bcrypt.hash(password, 10);
	}

	static createAuthToken(id: string): string {
		// const {JWT_SECRET} = useRuntimeConfig(); // TODO: Get this to work with vitest
		
		return JWT.sign({id: id, salt: Math.random()}, process.env['JWT_SECRET'], {expiresIn: '1d'});
	}

	static setAuthToken(event: H3Event, user: User): void {
		// const {JWT_SECRET} = useRuntimeConfig(); // TODO: Get this to work with vitest

		const authToken = this.createAuthToken(user.id);

		setCookie(event, 'session', authToken, {httpOnly: true});
	}

	static getCurrentUserId(event: H3Event): string | undefined {
		// const {JWT_SECRET} = useRuntimeConfig(); // TODO: Get this to work with vitest

		const authToken = getCookie(event, 'session');

		if(!authToken) {
			return undefined;
		}

		try {
			const {id} = JWT.verify(authToken, process.env['JWT_SECRET']) as {id: string};

			return id;
		} catch (e) {
			// TODO: Log error
			return undefined;
		}
	}

	static async login(event: H3Event, {username, password}: SessionRequest): Promise<User> {
		const user = await prisma.user.findFirst({ where: { username } });

		if(!user) {
			return undefined;
		}

		const isValidPassword = await bcrypt.compare(password, user.password);

		if(!isValidPassword) {
			return undefined;
		}

		this.setAuthToken(event, user);

		return user;
	}

	static logout(event: H3Event): void {
		setCookie(event, 'session', '', {httpOnly: true, expires: new Date(0)});
	}
}
