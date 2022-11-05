import { SessionRequest, ISessionRequest, SessionResponse, ISessionResponse, UserResponse } from "@/contracts";
import { AuthService } from "@/server/services";

export default defineEventHandler(async (event): Promise<ISessionResponse> => {
	const data = await useBody<ISessionRequest>(event);
	const request = new SessionRequest(data);

	await request.validate(['username', 'password']);

	const user = await AuthService.login(event, request);

	return new SessionResponse({
		user: new UserResponse(user)
	}).toJSON();
})

