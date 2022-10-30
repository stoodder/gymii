import { AuthService } from "@/server/services";
import { SessionSerializer } from "@/server/serializers";
import type { SessionRequest, SessionResponse } from "@/contracts";
import { validateSessionRequest } from "@/validators";
import { SessionService } from "~~/services";

export default defineEventHandler(async (event): Promise<SessionResponse> => {
	const currentUser = await AuthService.restoreSession(event);

	await AuthService.logout(event);

	return new SessionSerializer({user: currentUser});
})

