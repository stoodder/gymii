export default class ValidationError extends Error {
	errors: {[key: string]: string} = {};

	constructor(errors: {[key: string]: string}, message: string = "Validation error") {
		super(message);
		this.errors = errors;
	}
}
