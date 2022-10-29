export default class ResponseError extends Error {
	statusCode: number;
	message: string;
	errors?: {[key: string]: string};

	constructor(statusCode: number, message: string = "Response error", errors?: {[key: string]: string}) {
		super(message);
		this.statusCode = statusCode;
		this.errors = errors;
	}

	// Required for h3 to propogate original error to be used in onError handler
	get data() { return this }

	toJSON() {
		return {
			statusCode: this.statusCode,
			message: this.message,
			errors: this.errors
		};
	}
}
