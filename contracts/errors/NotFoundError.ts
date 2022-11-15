import ResponseError from "./ResponseError";

export default class NotFoundError<I = any> extends ResponseError<I> {
	constructor(message: string = "Not found") {
		super({statusCode: 404, message});
	}
}
