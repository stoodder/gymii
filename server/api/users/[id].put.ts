import { UserResponse, IUserResponse, UserRequest, IUserRequest } from "@/contracts";
import prisma from "@/server/prisma";
import { ValidationError } from "@/contracts/errors";
import { useCurrentUser, guardCanModifyUser } from "@/server/composables";

export default defineEventHandler(async (event): Promise<IUserResponse> => {
	const currentUser = await useCurrentUser(event);

	await guardCanModifyUser(currentUser, event.context.params.id);

	const data = await useBody<IUserRequest>(event);
	const request = new UserRequest(data);

	await request.validate(['email', 'username', 'name']);

	const validationError = new ValidationError<UserRequest>();

	if(request.email && currentUser.email !== request.email) {
		const emailExists = await prisma.user.findFirst({
			where: {
				NOT: { id: currentUser.id },
				email: request.email,
			}
		});

		if(emailExists) {
			validationError.setError('email', "Email already exists");
		}
	}

	if(request.username && currentUser.username !== request.username) {
		const usernameExists = await prisma.user.findFirst({
			where: {
				NOT: { id: currentUser.id },
				username: request.username,
			}
		});

		if(usernameExists) {
			validationError.setError('username', "Username already exists");
		}
	}

	if(validationError.hasErrors) {
		throw validationError;
	}

	const updatedUser = await prisma.user.update({
		where: { id: currentUser.id },
		data: {
			username: request.username,
			email: request.email,
			name: request.name,
		}
	});

	return new UserResponse(updatedUser).toJSON();
})

