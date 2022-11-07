import type { User } from "@/server/prisma";
import { H3Event } from "h3";
import { UnauthorizedError } from "@/contracts/errors";
import { AuthService } from "@/server/services";
import prisma from "@/server/prisma";

export default async function guardAuthenticated(event: H3Event): Promise<User> {
	const id = AuthService.getCurrentUserId(event);

	if(!id) {
		throw new UnauthorizedError('Not logged in');
	}

	const user = await prisma.user.findFirst({ where: { id } });

	if(!user) {
		throw new UnauthorizedError('Not logged in');
	}

	return user;
}
