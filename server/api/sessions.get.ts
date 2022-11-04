import { SessionResponse, UserResponse, ISessionResponse } from "@/contracts";
import { AuthService } from "@/server/services";

export default defineEventHandler(async (event): Promise<ISessionResponse> => {
	const user = await AuthService.restoreSession(event);

	return new SessionResponse({
		user: new UserResponse(user)
	}).toJSON();
})

