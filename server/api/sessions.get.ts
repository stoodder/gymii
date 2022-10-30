import { AuthService } from "@/server/services";
import { SessionSerializer } from "@/server/serializers";
import type { SessionResponse } from "@/contracts";

export default defineEventHandler(async (event) => {
	const user = await AuthService.restoreSession(event);

	return new SessionSerializer({user});
})

