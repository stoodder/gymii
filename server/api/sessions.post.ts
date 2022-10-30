import { AuthService } from "@/server/services";
import { SessionSerializer } from "@/server/serializers";
import type { SessionRequest } from "@/contracts/requests";
import type { SessionResponse } from "@/contracts/responses";

export default defineEventHandler(async (event): Promise<SessionResponse> => {
	const { email, password } = await useBody(event) as SessionRequest;

	const user = await AuthService.login(email, password);

	return new SessionSerializer({user});
})

