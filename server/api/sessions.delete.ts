import { SessionResponse, ISessionResponse, UserResponse } from "@/contracts";
import { AuthService } from "@/server/services";

export default defineEventHandler(async (event): Promise<ISessionResponse> => {
	const currentUser = await AuthService.restoreSession(event);

	await AuthService.logout(event);

	return new SessionResponse({
		user: new UserResponse(currentUser)
	}).toJSON();
});
