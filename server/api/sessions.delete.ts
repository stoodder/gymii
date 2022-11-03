import { SessionResponse } from "@/contracts";
import { AuthService } from "@/server/services";

export default defineEventHandler(async (event): Promise<SessionResponse> => {
	const currentUser = await AuthService.restoreSession(event);

	await AuthService.logout(event);

	return new SessionResponse({user: currentUser});
});
