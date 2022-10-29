import { AuthService } from "@/server/services";
import { SessionSerializer } from "@/server/serializers";
import type { SessionRequest } from "@/contracts/requests";

export default defineEventHandler(async (event) => {
	const { email, password } = await useBody(event) as SessionRequest;

	const user = await AuthService.login(email, password);

	return new SessionSerializer({user});
})

