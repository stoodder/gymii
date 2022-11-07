import { defineEventHandler } from "h3";
import { guardAuthenticated } from "@/server/guards";
import { pickBody } from "@/server/utils";
import prisma from "@/server/prisma";
import { AuthService } from "@/server/services";
import {
	IChangePasswordRequest,
	ChangePasswordRequest,
	IChangePasswordResponse,
	ChangePasswordResponse,
	NotAuthorizedError,
} from "@/contracts";

export default defineEventHandler<IChangePasswordResponse>(async event => {
	const currentUser = await guardAuthenticated(event)

	const data = await pickBody<IChangePasswordRequest>(event);

	const request = new ChangePasswordRequest(data);

	await request.validate(['password', 'newPassword']);

	// Verify password against current password
	if(!await AuthService.verifyPassword(currentUser, request.password)) {
		throw new NotAuthorizedError('Incorrect password');
	}

	// Update to the new password
	await prisma.user.update({
		where: { id: currentUser.id },
		data: {
			password: await AuthService.encryptPassword(data.newPassword)
		}
	})

	return new ChangePasswordResponse({success: true}).toJSON()
})
