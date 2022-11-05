import ResponseError from "./ResponseError";

export default class NotFoundError extends ResponseError {
	constructor(message: string = "Not authorized") {
		super({ statusCode: 403, message });
	}
}
