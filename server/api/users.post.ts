import { AuthService } from "@/server/services";
import { SessionSerializer } from "@/server/serializers";
import type { UserRequest } from "@/contracts/requests";

export default defineEventHandler(async (event) => {
	const { email, name, password } = await useBody(event) as UserRequest;

	const user = await AuthService.register({email, name, password});

	return new SessionSerializer({user});
})

