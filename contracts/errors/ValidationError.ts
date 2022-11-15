import type { Errors } from "./types";
import ResponseError from "./ResponseError";

export default class ValidationError<I = any> extends ResponseError<I> {
	constructor(errors: Errors<I> | undefined = undefined) {
		super({
			statusCode: 400,
			message: undefined,
			errors
		});
	}
}
