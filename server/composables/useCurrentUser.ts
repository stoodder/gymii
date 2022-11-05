import { AuthService } from "@/server/services";
import type { User } from "@/server/prisma";
import { H3Event } from "h3";

export default function useCurrentUser(event: H3Event): Promise<User> {
	return AuthService.restoreSession(event);
}
