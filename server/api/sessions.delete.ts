import { SessionResponse, ISessionResponse, UserResponse } from "@/contracts";
import { AuthService } from "@/server/services";
import { useCurrentUser } from "@/server/composables";
import { defineEventHandler } from "h3";

export default defineEventHandler(async (event): Promise<ISessionResponse> => {
	const currentUser = await useCurrentUser(event);

	AuthService.logout(event);

	return new SessionResponse({
		user: new UserResponse(currentUser)
	}).toJSON();
});
