import type { SessionResponse } from "@/contracts";
import { AuthService } from "@/server/services";
import { SessionSerializer } from "@/server/serializers";

export default defineEventHandler(async (event): Promise<SessionResponse> => {
	const currentUser = await AuthService.restoreSession(event);

	await AuthService.logout(event);

	return new SessionSerializer({user: currentUser});
});
