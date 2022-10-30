import ResponseError from "./ResponseError";

export default class NotFoundError extends ResponseError {
	constructor(message: string = "Bad request") {
		super({ statusCode: 400, message });
	}
}
