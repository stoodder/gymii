import { describe, test, beforeEach, afterEach, expect } from "vitest";
import useMockApi, { MockApi, createAuthCookieString } from '@/server/tests/mocks';

describe("sessions.get", async () => {
	let mockApi: MockApi;

	beforeEach(async () => {
		mockApi = await useMockApi('/api/sessions', "@/server/api/sessions.get");
	})

	afterEach(() => {
		mockApi.reset();
	})

	test("Should respond with unauthorized if not authToken set", async () => {
		await mockApi.request.get('/api/sessions')
		.send()
		.expect(401, { 
			statusCode: 401,
			message: "Not logged in"
		})
	});

	test("Should respond with unauthorized if invalid authToken set", async () => {
		await mockApi.request.get('/api/sessions')
		.set('cookie', 'session=invalid')
		.send()
		.expect(401, { 
			statusCode: 401,
			message: "Not logged in"
		})
	});

	test("Should respond with unauthorized if unknown user", async () => {
		await mockApi.request.get('/api/sessions')
		.set('cookie', createAuthCookieString('$user-unknown'))
		.send()
		.expect(401, { 
			statusCode: 401,
			message: "Not logged in"
		})
	});

	test("Should delete delete cookie when ", async () => {
		await mockApi.request.get('/api/sessions')
		.set('cookie', createAuthCookieString('$user-1'))
		.send()
		.expect(res => expect(res.headers['set-cookie']).not.toBeDefined())
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
