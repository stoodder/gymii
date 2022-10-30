import * as bcrypt from 'bcrypt';
import type { User, Prisma } from "@/server/prisma"
import prisma from "@/server/prisma";
import { ValidationError, UnauthorizedError } from "@/errors";
import { SessionRequest } from "@/contracts";

export default class AuthService {
	static encryptPassword(password: string): Promise<string> {
		return bcrypt.hash(password, 10);
	}

	static async register(input: Prisma.UserCreateInput): Promise<User> {
		if( await prisma.user.findFirst({ where: { email: input.email } })) {
			throw new ValidationError({email: 'Email already exists'});
		}

		const password = await this.encryptPassword(input.password);

		return await prisma.user.create({
			data: {...input, password}
		});
	}

	static async login({email, password}: SessionRequest): Promise<User> {
		const user = await prisma.user.findFirst({ where: { email } });

		if(!user) {
			throw new UnauthorizedError('Invalid credentials');
		}

		const isValidPassword = await bcrypt.compare(password, user.password);

		if(!isValidPassword) {
			throw new UnauthorizedError('Invalid credentials');
		}

		return user;
	}
}
