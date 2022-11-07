import { describe, test, beforeEach, afterEach, expect } from "vitest";
import useMockApi, { MockApi, createAuthCookieString } from '@/server/tests/mocks';

describe("/api/sessions.delete", async () => {
	let mockApi: MockApi;

	beforeEach(async () => {
		mockApi = await useMockApi('/api/sessions', "@/server/api/sessions.delete");
	})

	afterEach(() => {
		mockApi.reset();
	})

	test("Should respond with unauthorized if not authToken set", async () => {
		await mockApi.request.delete('/api/sessions')
		.send()
		.expect(401, { 
			statusCode: 401,
			message: "Not logged in"
		})
	});

	test("Should respond with unauthorized if invalid authToken set", async () => {
		await mockApi.request.delete('/api/sessions')
		.set('cookie', 'session=invalid')
		.send()
		.expect(401, { 
			statusCode: 401,
			message: "Not logged in"
		})
	});

	test("Should respond with unauthorized if unknown user", async () => {
		await mockApi.request.delete('/api/sessions')
		.set('cookie', createAuthCookieString('$user-unknown'))
		.send()
		.expect(401, { 
			statusCode: 401,
			message: "Not logged in"
		})
	});

	test("Should delete cookie when valid authToken provided", async () => {
		await mockApi.request.delete('/api/sessions')
		.set('cookie', createAuthCookieString('$user-1'))
		.send()
		.expect(res => expect(res.headers['set-cookie']).toBeDefined())
		.expect(res => expect(res.headers['set-cookie']).toMatch('session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly'))
		.expect(200, { 
			user: {
				id: '$user-1',
				email: 'test@test.com',
				username: 'test',
				name: 'test name'
			}
		})
	});
});
