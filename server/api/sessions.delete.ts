import { SessionResponse, ISessionResponse, UserResponse } from "@/contracts";
import { AuthService } from "@/server/services";
import { useCurrentUser } from "@/server/composables";

export default defineEventHandler(async (event): Promise<ISessionResponse> => {
	const currentUser = await useCurrentUser(event);

	await AuthService.logout(event);

	return new SessionResponse({
		user: new UserResponse(currentUser)
	}).toJSON();
});
