import prisma from "@/server/prisma";
import type { User } from "@/server/prisma";
import { NotAuthorizedError, NotFoundError } from "~~/contracts/errors";

export default async function guardCanModifyUser(currentUser: User, user: string | User) {
	if(typeof user === 'string') {
		user = await prisma.user.findUnique({
			where: {
				id: user
			}
		});

		if(!user) {
			throw new NotFoundError("User not found");
		}
	}

	if(user.id !== currentUser.id) {
		throw new NotAuthorizedError("You are not authorized to update this user");
	}
}
