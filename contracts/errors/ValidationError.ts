import type { Errors } from "./types";
import ResponseError from "./ResponseError";

export default class ValidationError<T = any> extends ResponseError<T> {
	constructor(errors: Errors<T> | undefined = undefined) {
		super({
			statusCode: 400,
			message: undefined,
			errors
		});
	}
}
