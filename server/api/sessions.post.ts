import { SessionRequest, ISessionRequest, SessionResponse, UserResponse } from "@/contracts";
import { AuthService } from "@/server/services";

export default defineEventHandler(async (event): Promise<SessionResponse> => {
	const data = await useBody<ISessionRequest>(event);
	const request = new SessionRequest(data);

	await request.validate();

	const user = await AuthService.login(event, request);

	return new SessionResponse({
		user: new UserResponse(user)
	});
})

