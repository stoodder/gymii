import ResponseError from "./ResponseError";

export default class NotFoundError extends ResponseError {
	constructor(message: string = "Not found") {
		super({statusCode: 404, message});
	}
}
