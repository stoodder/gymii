import ResponseError from "./ResponseError";

export default class InternalServerError<I = any> extends ResponseError<I> {
	constructor(message: string = "Internal server error") {
		super({statusCode: 500, message});
	}
}
