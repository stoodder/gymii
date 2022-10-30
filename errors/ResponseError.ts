interface ResponseErrorInterface {
	message: string;
	statusCode: number;
	errors?: {[key: string]: string};
}

export default class ResponseError extends Error implements ResponseErrorInterface {
	statusCode: number;
	errors?: {[key: string]: string};

	constructor({message, statusCode, errors}: ResponseErrorInterface) {
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
