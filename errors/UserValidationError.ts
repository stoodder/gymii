import ResponseError from "./ResponseError";
import type { User } from "@/server/prisma";

export default class UserValidationError extends ResponseError {
	constructor(errors: { [key in keyof Partial<User>]: string }) {
		super(400, "User validation error", errors);
	}
}
