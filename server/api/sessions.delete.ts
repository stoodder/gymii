import { AuthService } from "@/server/services";
import { guardAuthenticated } from "@/server/guards";
import { defineEventHandler } from "h3";
import {
	SessionResponse,
	ISessionResponse,
	UserResponse
} from "@/contracts";

export default defineEventHandler(async (event): Promise<ISessionResponse> => {
	const currentUser = await guardAuthenticated(event);

	AuthService.logout(event);

	return new SessionResponse({
		user: new UserResponse(currentUser)
	}).toJSON();
});
