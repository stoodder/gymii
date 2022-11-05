import { SessionResponse, UserResponse, ISessionResponse } from "@/contracts";
import { useCurrentUser } from "@/server/composables";

export default defineEventHandler(async (event): Promise<ISessionResponse> => {
	const user = await useCurrentUser(event);

	return new SessionResponse({
		user: new UserResponse(user)
	}).toJSON();
})

