import ValidationError from "./ValidationError";
import type { User } from "@/server/prisma";

export default class UserValidationError extends ValidationError {
	constructor(errors: { [key in keyof Partial<User>]: string }) {
		super(errors, "User validation error");
	}
}
