import { UserResponse, IUserResponse, UserRequest, IUserRequest } from "@/contracts";
import { AuthService } from "@/server/services";
import prisma from "@/server/prisma";
import { ValidationError } from "@/contracts/errors";
import { defineEventHandler, readBody } from "h3";

export default defineEventHandler(async (event): Promise<IUserResponse> => {
	const data = await readBody<IUserRequest>(event);
	const request = new UserRequest(data);

	await request.validate(['username', 'email', 'name', 'password']);

	let validationError = new ValidationError<UserRequest>()

	if( await prisma.user.findFirst({ where: { username: request.username } }) ) {
		validationError.setError('username', "Username is taken");
	}

	if( await prisma.user.findFirst({ where: { email: request.email } }) ) {
		validationError.setError('email', "Email is taken");
	}

	if(validationError.hasErrors) {
		throw validationError;
	}

	const user = await prisma.user.create({data: {
		username: request.username,
		email: request.email,
		name: request.name,
		password: await AuthService.encryptPassword(request.password),
	}});

	AuthService.setAuthToken(event, user);

	return new UserResponse(user).toJSON();
})

