import { describe, test, beforeEach, afterEach, expect } from "vitest";
import useMockApi, { MockApi } from '@/server/tests/mocks';

describe("/api/sessions.post", async () => {
	let mockApi: MockApi;

	beforeEach(async () => {
		mockApi = await useMockApi('/api/sessions', "@/server/api/sessions.post");
	})

	afterEach(() => {
		mockApi.reset();
	})

	test("Expect validations errors", async () => {
		await mockApi.request.post('/api/sessions')
		.send({})
		.expect(res => expect(res.headers['set-cookie']).not.toBeDefined())
		.expect(400, { 
			statusCode: 400,
			errors: {
				username: 'Username is required',
				password: 'Password is required'
			}
		})
	});

	test("Expect not authenticated error when no user exists", async () => {
		await mockApi.request.post('/api/sessions')
		.send({username: 'wrong', password: 'wrong'})
		.expect(res => expect(res.headers['set-cookie']).not.toBeDefined())
		.expect(401, { 
			statusCode: 401,
			message: "Invalid credentials"
		})
	});

	test("Expect not authenticated error when wrong password", async () => {
		await mockApi.request.post('/api/sessions')
		.send({username: 'test', password: 'wrong'})
		.expect(res => expect(res.headers['set-cookie']).not.toBeDefined())
		.expect(401, { 
			statusCode: 401,
			message: "Invalid credentials"
		})
	});

	test("Expect login to succeed with expected response", async () => {
		await mockApi.request.post('/api/sessions')
		.send({username: 'test', password: 'password'})
		.expect(res => expect(res.headers['set-cookie']).toBeDefined())
		.expect(res => expect(res.headers['set-cookie']).toMatch(/session=/))
		.expect(res => expect(res.headers['set-cookie']).toMatch(/HttpOnly/))
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
