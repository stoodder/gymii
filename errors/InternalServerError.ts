import ResponseError from "./ResponseError";

export default class InternalServerError extends ResponseError {
	constructor(message: string = "Internal server error") {
		super({statusCode: 500, message});
	}
}
