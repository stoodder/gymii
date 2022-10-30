import { AuthService } from "@/server/services";
import { UserSerializer } from "@/server/serializers";
import type { UserRequest, UserResponse } from "@/contracts";

export default defineEventHandler(async (event): Promise<UserResponse> => {
	const { email, name, password } = await useBody<UserRequest>(event);

	const user = await AuthService.register({email, name, password});

	return new UserSerializer({user});
})

