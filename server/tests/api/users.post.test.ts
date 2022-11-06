import { describe, test, beforeEach, afterEach, expect } from "vitest";
import useMockApi, { MockApi } from '@/server/tests/mocks';

describe("users.post", async () => {
	let mockApi: MockApi;

	beforeEach(async () => {
		mockApi = await useMockApi('/api/users', "@/server/api/users.post");
	})

	afterEach(() => {
		mockApi.reset();
	})

	test("Expected validations errors", async () => {
		await mockApi.request.post('/api/users')
		.send({})
		.expect(res => expect(res.headers['set-cookie']).not.toBeDefined())
		.expect(400, { 
			statusCode: 400,
			errors: {
				email: 'Email is required',
				name: 'Name is required',
				username: 'Username is required',
				password: 'Password is required'
			}
		})
	});

	test("Email should be to be a valid email", async () => {
		await mockApi.request.post('/api/users')
		.send({
			email: 'test',
			username: 'test_new',
			name: 'new test name',
			password: 'password',
		})
		.expect(res => expect(res.headers['set-cookie']).not.toBeDefined())
		.expect(400, { 
			statusCode: 400,
			errors: {
				email: 'Email is not a valid email address',
			}
		})
	});

	test("Username should be to be a valid username", async () => {
		await mockApi.request.post('/api/users')
		.send({
			email: 'test@test.com',
			username: 'test-new',
			name: 'new test name',
			password: 'password',
		})
		.expect(res => expect(res.headers['set-cookie']).not.toBeDefined())
		.expect(400, { 
			statusCode: 400,
			errors: {
				username: 'Username can only contain letters, numbers, and underscores',
			}
		})
	});

	test("Username should be at least 3 characters", async () => {
		await mockApi.request.post('/api/users')
		.send({
			email: 'test@test.com',
			username: 't',
			name: 'new test name',
			password: 'password',
		})
		.expect(res => expect(res.headers['set-cookie']).not.toBeDefined())
		.expect(400, { 
			statusCode: 400,
			errors: {
				username: 'Username must be at least 3 characters',
			}
		})
	});

	test("Username should be at most 24 characters", async () => {
		await mockApi.request.post('/api/users')
		.send({
			email: 'test@test.com',
			username: 'testtesttesttesttesttesttesttesttest',
			name: 'new test name',
			password: 'password',
		})
		.expect(res => expect(res.headers['set-cookie']).not.toBeDefined())
		.expect(400, { 
			statusCode: 400,
			errors: {
				username: 'Username must be at most 24 characters',
			}
		})
	});

	test("Password should be at least 8 characters", async () => {
		await mockApi.request.post('/api/users')
		.send({
			email: 'test@test.com',
			username: 'test_new',
			name: 'new test name',
			password: 'pass',
		})
		.expect(res => expect(res.headers['set-cookie']).not.toBeDefined())
		.expect(400, { 
			statusCode: 400,
			errors: {
				password: 'Password must be at least 8 characters',
			}
		})
	});

	test("Email should be unique", async () => {
		await mockApi.request.post('/api/users')
		.send({
			email: 'test@test.com',
			username: 'test_new',
			name: 'new test name',
			password: 'password',
		})
		.expect(res => expect(res.headers['set-cookie']).not.toBeDefined())
		.expect(400, { 
			statusCode: 400,
			errors: {
				email: 'Email is taken',
			}
		})
	});

	test("Username should be unique", async () => {
		await mockApi.request.post('/api/users')
		.send({
			email: 'test_new@test.com',
			username: 'test',
			name: 'new test name',
			password: 'password',
		})
		.expect(res => expect(res.headers['set-cookie']).not.toBeDefined())
		.expect(400, { 
			statusCode: 400,
			errors: {
				username: 'Username is taken',
			}
		})
	});

	test("Should create a new user", async () => {
		await mockApi.request.post('/api/users')
		.send({
			email: 'test_new@test.com',
			username: 'test_new',
			name: 'new test name',
			password: 'password',
		})
		.expect(res => expect(res.headers['set-cookie']).toBeDefined())
		.expect(res => expect(res.headers['set-cookie']).toMatch(/session=/))
		.expect(res => expect(res.headers['set-cookie']).toMatch(/HttpOnly/))
		.expect(200, {
			id: '$user-new-1',
			email: 'test_new@test.com',
			username: 'test_new',
			name: 'new test name'
		})
	});
});
