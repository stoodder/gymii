import { describe, test, beforeEach, afterEach, expect } from "vitest";
import useMockApi, { MockApi, createAuthCookieString } from '@/server/tests/mocks';

describe("/api/rpc/change-password.post", async () => {
	let mockApi: MockApi;

	beforeEach(async () => {
		mockApi = await useMockApi('/api/rpc/change-password', "@/server/api/rpc/change-password.post");
	})

	afterEach(() => {
		mockApi.reset();
	})

	test("Expect user to be logged in", async () => {
		await mockApi.request.post('/api/rpc/change-password')
		.send()
		.expect(401, { 
			statusCode: 401,
			message: "Not logged in"
		})
	});

	test("Expect validations errors", async () => {
		await mockApi.request.post('/api/rpc/change-password')
		.set('cookie', createAuthCookieString('$user-1'))
		.send()
		.expect(res => expect(res.headers['set-cookie']).not.toBeDefined())
		.expect(400, { 
			statusCode: 400,
			errors: {
				password: 'Password is required',
				newPassword: 'New password must be different'
			}
		})
	});

	test("Expect current password to be correct", async () => {
		await mockApi.request.post('/api/rpc/change-password')
		.set('cookie', createAuthCookieString('$user-1'))
		.send({
			password: 'wrong-password',
			newPassword: 'password-new'
		})
		.expect(res => expect(res.headers['set-cookie']).not.toBeDefined())
		.expect(403, {
			statusCode: 403,
			message: 'Incorrect password'
		})
	});

	test("Expect new password to be different", async () => {
		await mockApi.request.post('/api/rpc/change-password')
		.set('cookie', createAuthCookieString('$user-1'))
		.send({
			password: 'password',
			newPassword: 'password'
		})
		.expect(res => expect(res.headers['set-cookie']).not.toBeDefined())
		.expect(400, {
			statusCode: 400,
			errors: {
				newPassword: 'New password must be different'
			}
		})
	});

	test("Password should be at least 8 characters", async () => {
		await mockApi.request.post('/api/rpc/change-password')
		.set('cookie', createAuthCookieString('$user-1'))
		.send({
			password: 'password',
			newPassword: 'pass'
		})
		.expect(res => expect(res.headers['set-cookie']).not.toBeDefined())
		.expect(400, { 
			statusCode: 400,
			errors: {
				newPassword: 'Password must be at least 8 characters',
			}
		})
	});

	test("Should successfully change password", async () => {
		await mockApi.request.post('/api/rpc/change-password')
		.set('cookie', createAuthCookieString('$user-1'))
		.send({
			password: 'password',
			newPassword: 'password-new'
		})
		.expect(res => expect(res.headers['set-cookie']).not.toBeDefined())
		.expect(200, {
			success: true
		});
	})
});
