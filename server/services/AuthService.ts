import type { User, Prisma } from "@/server/prisma"
import prisma from "@/server/prisma";
import { UserValidationError, UnauthorizedError } from "@/server/errors";
import * as bcrypt from 'bcrypt';

type RegisterInput = Omit<Prisma.UserCreateInput, 'salt'>

export default class AuthService {
	static generateSalt(): Promise<string> {
		return bcrypt.genSalt(10);
	}

	static encryptPassword(password: string, salt: string): Promise<string> {
		return bcrypt.hash(password, salt);
	}

	static async register(input: RegisterInput): Promise<User> {
		if( await prisma.user.findFirst({ where: { email: input.email } })) {
			throw new UserValidationError({email: 'Email already exists'});
		}

		const salt = await this.generateSalt();
		const password = await this.encryptPassword(input.password, salt);

		return await prisma.user.create({
			data: {...input, salt, password}
		});
	}

	static async login(email: string, password: string): Promise<User> {
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
