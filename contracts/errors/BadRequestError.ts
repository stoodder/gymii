import ResponseError from "./ResponseError";

export default class NotFoundError<I = any> extends ResponseError<I> {
	constructor(message: string = "Bad request") {
		super({ statusCode: 400, message });
	}
}
