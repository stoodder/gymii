import { AuthService } from "@/server/services";
import { defineEventHandler, readBody } from "h3";
import {
	SessionRequest,
	ISessionRequest,
	SessionResponse,
	ISessionResponse,
	UserResponse,
	UnauthorizedError
} from "@/contracts";

export default defineEventHandler(async (event): Promise<ISessionResponse> => {
	const data = await readBody<ISessionRequest>(event);
	const request = new SessionRequest(data);

	await request.validate(['username', 'password']);

	const user = await AuthService.login(event, request);

	if(!user) {
		throw new UnauthorizedError('Invalid credentials');
	}

	return new SessionResponse({
		user: new UserResponse(user)
	}).toJSON();
})

