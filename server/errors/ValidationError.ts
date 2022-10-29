import ResponseError from "./ResponseError";

export default class ValidationError extends ResponseError {
	errors: {[key: string]: string} = {};

	constructor(errors: {[key: string]: string}, message: string = "Validation error") {
		super(400, message);
		this.errors = errors;
	}

	toJSON() {
		return {
			...super.toJSON(),
			errors: this.errors,
		}
	}
}
