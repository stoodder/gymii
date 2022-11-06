import { SessionResponse, UserResponse, ISessionResponse } from "@/contracts";
import { useCurrentUser } from "@/server/composables";
// import { defineEventHandler } from "h3";

export default defineEventHandler(async (event): Promise<ISessionResponse> => {
	const user = await useCurrentUser(event);

	return new SessionResponse({
		user: new UserResponse(user)
	}).toJSON();
})

