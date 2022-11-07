import { guardAuthenticated } from "@/server/guards";
import { defineEventHandler } from "h3";
import {
	SessionResponse,
	UserResponse,
	ISessionResponse
} from "@/contracts";

export default defineEventHandler(async (event): Promise<ISessionResponse> => {
	const user = await guardAuthenticated(event);

	return new SessionResponse({
		user: new UserResponse(user)
	}).toJSON();
})

