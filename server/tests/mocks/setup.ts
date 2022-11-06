import { AuthService } from "@/server/services";
import { vi } from "vitest";
import type { User } from "@prisma/client";

Object.assign(process.env, {
	JWT_SECRET: 'test',
});

vi.mock('@prisma/client', () => {
	const MockPrismaClient = vi.fn();
	
	MockPrismaClient.prototype = {
		user: {
			findFirst: vi.fn(async (query): Promise<User> => {
				if(query.where?.username === 'test') {
					return {
						id: '1',
						username: 'test',
						email: 'test@test.com',
						name: 'test name',
						password: await AuthService.encryptPassword('test'),
						createdAt: new Date(),
						updatedAt: new Date(),
					}
				}
			}),
		}
	}

	return {
		PrismaClient: MockPrismaClient
	}
})
