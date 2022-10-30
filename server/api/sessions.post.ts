import type { SessionRequest, SessionResponse } from "@/contracts";
import { AuthService } from "@/server/services";
import { SessionSerializer } from "@/server/serializers";
import { validateSessionRequest } from "@/validators";

export default defineEventHandler(async (event): Promise<SessionResponse> => {
	const data = await useBody<SessionRequest>(event);

	await validateSessionRequest(data);

	const user = await AuthService.login(event, data);

	return new SessionSerializer({user});
})

