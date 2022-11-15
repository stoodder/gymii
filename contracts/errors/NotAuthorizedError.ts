import ResponseError from "./ResponseError";

export default class NotFoundError<I = any> extends ResponseError<I> {
	constructor(message: string = "Not authorized") {
		super({ statusCode: 403, message });
	}
}
