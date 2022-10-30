import { AuthService } from "@/server/services";
import { SessionSerializer } from "@/server/serializers";
import type { SessionRequest, SessionResponse } from "@/contracts";
import { validateSessionRequest } from "@/validators";

export default defineEventHandler(async (event): Promise<SessionResponse> => {

	return new SessionSerializer({user: null});
})

