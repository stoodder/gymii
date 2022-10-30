import { AuthService } from "@/server/services";
import { SessionSerializer } from "@/server/serializers";
import type { SessionRequest, SessionResponse } from "@/contracts";

export default defineEventHandler(async (event): Promise<SessionResponse> => {
	const { email, password } = await useBody<SessionRequest>(event);

	const user = await AuthService.login(email, password);

	return new SessionSerializer({user});
})

