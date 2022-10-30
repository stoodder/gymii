import { AuthService } from "@/server/services";
import { UserSerializer } from "@/server/serializers";
import type { UserRequest } from "@/contracts/requests";
import type { UserResponse } from "@/contracts/responses";

export default defineEventHandler(async (event): Promise<UserResponse> => {
	const { email, name, password } = await useBody(event) as UserRequest;

	const user = await AuthService.register({email, name, password});

	return new UserSerializer({user});
})

