import { AuthService } from "@/server/services";
import { vi } from "vitest";
import type { User } from "@prisma/client";

require("dotenv").config();

const users: User[] = [{
	id: '$user-1',
	username: 'test',
	email: 'test@test.com',
	name: 'test name',
	password: await AuthService.encryptPassword('test'),
	createdAt: new Date(),
	updatedAt: new Date(),
}]

vi.mock('@prisma/client', () => {
	const MockPrismaClient = vi.fn();
	
	MockPrismaClient.prototype = {
		user: {
			findFirst: vi.fn(async (query): Promise<User> => {
				if(query.where?.username) {
					return users.find(u => u.username === query.where.username);
				} else if(query.where?.id) {
					return users.find(u => u.id === query.where.id);
				} else if(query.where?.email) {
					return users.find(u => u.email === query.where.email);
				}
			}),
			create: vi.fn(async (query): Promise<User> => {
				const newUserIdIndex = users.filter(u => u.id.match(/^\$user-new-\d+$/)).length + 1;
				const user = {
					...query.data,
					id: '$user-new-' + newUserIdIndex,
					createdAt: new Date(),
					updatedAt: new Date(),
				}
				users.push(user);
				return user;
			})
		},
	}

	return {
		PrismaClient: MockPrismaClient
	}
})
