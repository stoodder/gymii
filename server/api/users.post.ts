import { UserResponse, UserRequest, IUserRequest } from "@/contracts";
import { AuthService } from "@/server/services";
import prisma from "@/server/prisma";
import { BadRequestError } from "@/errors";

export default defineEventHandler(async (event): Promise<UserResponse> => {
	const data = await useBody<IUserRequest>(event);
	const request = new UserRequest(data);

	await request.validate();

	const existingUser = await prisma.user.findFirst({where: {email: request.email}});

	if(existingUser) {
		throw new BadRequestError('User already exists');
	}

	const user = await AuthService.register(event, request);

	return new UserResponse(user);
})

