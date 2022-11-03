export interface IResponseError {
	message: string;
	statusCode: number;
	errors?: {[key: string]: string};
}

export default class ResponseError extends Error implements IResponseError {
	statusCode: number;
	errors?: {[key: string]: string};

	constructor({message, statusCode, errors}: IResponseError) {
		super(message);
		this.statusCode = statusCode;
		this.errors = errors;
	}

	// Required for h3 to propogate original error to be used in onError handler
	get data() { return this }

	toJSON(): IResponseError {
		return {
			statusCode: this.statusCode,
			message: this.message,
			errors: this.errors
		};
	}
}
