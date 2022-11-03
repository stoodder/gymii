import { SessionResponse } from "@/contracts";
import { AuthService } from "@/server/services";

export default defineEventHandler(async (event): Promise<SessionResponse> => {
	const user = await AuthService.restoreSession(event);

	return new SessionResponse({user});
})

