import type { SessionResponse } from "@/contracts";
import { AuthService } from "@/server/services";
import { SessionSerializer } from "@/server/serializers";

export default defineEventHandler(async (event): Promise<SessionResponse> => {
	const user = await AuthService.restoreSession(event);

	return new SessionSerializer({user});
})

