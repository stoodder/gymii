import type { Errors } from "./types";

export interface IResponseError<I> {
	message: string;
	statusCode: number;
	errors?: Errors<I>;
}

export default class ResponseError<I = any> extends Error implements IResponseError<I> {
	statusCode: number;
	readonly _errors: Errors<I>;

	constructor({message, statusCode, errors}: IResponseError<T>) {
		super(message);
		this.statusCode = statusCode;
		this._errors = errors || ({} as Errors<I>);
	}

	// Required for h3 to propogate original error to be used in onError handler
	get data() { return this }

	get hasErrors() {
		return Object.keys(this._errors).length > 0;
	}

	setError(key: keyof Partial<I>, value: string) {
		this._errors[key as string] = value;
		return this;
	}

	getError(key: keyof I): string | undefined {
		if(!this._errors) return undefined
		return this._errors[key as string]
	}

	toJSON(): IResponseError<I> {
		return {
			statusCode: this.statusCode,
			message: this.message.length > 0 ? this.message : undefined,
			errors: this.hasErrors ? this._errors : undefined
		};
	}
}
