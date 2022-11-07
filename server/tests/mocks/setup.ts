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
}, {
	id: '$user-2',
	username: 'test2',
	email: 'test2@test.com',
	name: 'test2 name',
	password: await AuthService.encryptPassword('test'),
	createdAt: new Date(),
	updatedAt: new Date(),
}]

function userMatches(query, u) {
	if(query.where?.NOT) {
		if(query.where?.NOT.username && u.username === query.where.username) return false;
		if(query.where?.NOT.username && u.id === query.where.id) return false;
		if(query.where?.NOT.username && u.email === query.where.email) return false;
	}

	if(query.where?.username && u.username !== query.where.username) return false;
	if(query.where?.id && u.id !== query.where.id) return false
	if(query.where?.email && u.email !== query.where.email) return false;

	return true;
}

vi.mock('@prisma/client', () => {
	const MockPrismaClient = vi.fn();
	
	MockPrismaClient.prototype = {
		user: {
			findFirst: vi.fn(async (query): Promise<User> => {
				for(let u of users) {
					if(userMatches(query, u)) {
						return u;
					}
				}
			}),

			create: vi.fn(async (query): Promise<User> => {
				const user = {
					...query.data,
					id: '$user-new-1',
					createdAt: new Date(),
					updatedAt: new Date(),
				}
				
				return user;
			}),

			update: vi.fn(async (query): Promise<User> => {
				const user = users.find(u => {
					if(userMatches(query, u)) return u
				})

				if(user) {
					return {
						...user,
						...query.data,
						updatedAt: new Date()
					} as User
				}
			}),
		},
	}

	return {
		PrismaClient: MockPrismaClient
	}
})
