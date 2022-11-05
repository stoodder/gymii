import type { Errors } from "./types";

export interface IResponseError<T> {
	message: string;
	statusCode: number;
	errors?: Errors<T>;
}

export default class ResponseError<T = any> extends Error implements IResponseError<T> {
	statusCode: number;
	readonly _errors: Errors<T>;

	constructor({message, statusCode, errors}: IResponseError<T>) {
		super(message);
		this.statusCode = statusCode;
		this._errors = errors || ({} as Errors<T>);
	}

	// Required for h3 to propogate original error to be used in onError handler
	get data() { return this }

	get hasErrors() {
		return Object.keys(this._errors).length > 0;
	}

	setError(key: keyof Partial<T>, value: string) {
		this._errors[key as string] = value;
		return this;
	}

	getError(key: keyof T): string | undefined {
		if(!this._errors) return undefined
		return this._errors[key as string]
	}

	toJSON(): IResponseError<T> {
		return {
			statusCode: this.statusCode,
			message: this.message,
			errors: this.hasErrors ? this._errors : undefined
		};
	}
}
