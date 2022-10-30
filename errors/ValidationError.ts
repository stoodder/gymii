import ResponseError from "./ResponseError";
import type { User } from "@/server/prisma";

export default class ValidationError extends ResponseError {
	constructor(errors: { [key in keyof Partial<User>]: string }) {
		super({
			statusCode: 400,
			message: undefined,
			errors
		});
	}
}
