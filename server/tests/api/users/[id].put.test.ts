import { describe, test, beforeEach, afterEach, expect } from "vitest";
import useMockApi, { MockApi, createAuthCookieString } from '@/server/tests/mocks';

describe("/api/users/[id].put", async () => {
	let mockApi: MockApi;
	const id = '$user-1';

	beforeEach(async () => {
		mockApi = await useMockApi(`/api/users/:id`, "@/server/api/users/[id].put");
	})

	afterEach(() => {
		mockApi.reset();
	})
	
	test("Ensure user is logged in", async () => {
		await mockApi.request.put(`/api/users/${id}`)
		.send({})
		.expect(res => expect(res.headers['set-cookie']).not.toBeDefined())
		.expect(401, {
			statusCode: 401,
			message: "Not logged in",
		})
	});
	
	test("Ensure it handles invalid cookies", async () => {
		await mockApi.request.put(`/api/users/${id}`)
		.set('cookie', 'session=invalid')
		.send({})
		.expect(res => expect(res.headers['set-cookie']).not.toBeDefined())
		.expect(401, {
			statusCode: 401,
			message: "Not logged in",
		})
	});

	test("Ensure user is allowed to modify this user", async () => {
		await mockApi.request.put(`/api/users/${id}`)
		.set('cookie', createAuthCookieString("$user-2"))
		.send({})
		.expect(res => expect(res.headers['set-cookie']).not.toBeDefined())
		.expect(403, {
			statusCode: 403,
			message: "You are not authorized to update this user",
		})
	});

	test("Ensure data is provided", async () => {
		await mockApi.request.put(`/api/users/${id}`)
		.set('cookie', createAuthCookieString(id))
		.send({})
		.expect(res => expect(res.headers['set-cookie']).not.toBeDefined())
		.expect(400, {
			statusCode: 400,
			message: "No data provided",
		})
	});

	test("Email should be to be a valid email", async () => {
		await mockApi.request.put(`/api/users/${id}`)
		.set('cookie', createAuthCookieString(id))
		.send({
			email: 'test',
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
		await mockApi.request.put(`/api/users/${id}`)
		.set('cookie', createAuthCookieString(id))
		.send({
			username: 'test-new',
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
		await mockApi.request.put(`/api/users/${id}`)
		.set('cookie', createAuthCookieString(id))
		.send({
			username: 't',
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
		await mockApi.request.put(`/api/users/${id}`)
		.set('cookie', createAuthCookieString(id))
		.send({
			username: 'testtesttesttesttesttesttesttesttest',
		})
		.expect(res => expect(res.headers['set-cookie']).not.toBeDefined())
		.expect(400, { 
			statusCode: 400,
			errors: {
				username: 'Username must be at most 24 characters',
			}
		})
	});

	test("Name cannot be empty", async () => {
		await mockApi.request.put(`/api/users/${id}`)
		.set('cookie', createAuthCookieString(id))
		.send({
			name: '',
		})
		.expect(res => expect(res.headers['set-cookie']).not.toBeDefined())
		.expect(400, { 
			statusCode: 400,
			errors: {
				name: 'Name is required',
			}
		})
	});

	test("Email should be unique", async () => {
		await mockApi.request.put(`/api/users/${id}`)
		.set('cookie', createAuthCookieString(id))
		.send({
			email: 'test2@test.com',
		})
		.expect(res => expect(res.headers['set-cookie']).not.toBeDefined())
		.expect(400, { 
			statusCode: 400,
			errors: {
				email: 'Email already exists',
			}
		})
	});

	test("Username should be unique", async () => {
		await mockApi.request.put(`/api/users/${id}`)
		.set('cookie', createAuthCookieString(id))
		.send({
			username: 'test2',
		})
		.expect(res => expect(res.headers['set-cookie']).not.toBeDefined())
		.expect(400, { 
			statusCode: 400,
			errors: {
				username: 'Username already exists',
			}
		})
	});

	test("Successfuly update specific field and return user", async () => {
		await mockApi.request.put(`/api/users/${id}`)
		.set('cookie', createAuthCookieString(id))
		.send({
			id: '$user-update',
			email: 'test-update@test.com',
			username: 'test_update',
			name: 'test update',
		})
		.expect(res => expect(res.headers['set-cookie']).not.toBeDefined())
		.expect(200, {
			id: id,
			email: 'test-update@test.com',
			username: 'test_update',
			name: 'test update',
		})
	});
});
