import type { CreateUserRequest, UserResponse } from "@/contracts";
import { AuthService } from "@/server/services";
import { UserSerializer } from "@/server/serializers";
import prisma from "@/server/prisma";
import { BadRequestError } from "@/errors";
import { validateCreateUserRequest } from "@/validators";

export default defineEventHandler(async (event): Promise<UserResponse> => {
	const data = await useBody<CreateUserRequest>(event);

	await validateCreateUserRequest(data);

	const existingUser = await prisma.user.findFirst({where: {email: data.email}});

	if(existingUser) {
		throw new BadRequestError('User already exists');
	}

	const user = await AuthService.register(event, data);

	return new UserSerializer({user});
})

