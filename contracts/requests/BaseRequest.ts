import * as Yup from 'yup';
import { ValidationError } from "@/contracts/errors";
import { ErrorResponse, BaseResponse } from '@/contracts/responses';
import { ResponseError } from '@/contracts/errors';
import { BaseModel } from "@/models"

export default abstract class BaseRequest<
	R extends BaseResponse<BaseModel>,
	E extends ErrorResponse = ErrorResponse,
> {
	async validate<T>(shape: {[key in keyof T]: Yup.AnySchema}) {
		try {
			await Yup.object(shape).validate(this, {abortEarly: false, stripUnknown: true});
		} catch(e) {
			if(!(e instanceof Yup.ValidationError)) {
				throw e;
			}

			const errors = e.inner.reduce((acc, error) => {
				acc[error.path] = error.errors[0];
				return acc;
			}, {});

			throw new ValidationError(errors);
		}
	}

	async fetch(url: string, options: any = {}): Promise<R> {
		try {
			options = {
				...options,
				body: this.toJSON(),
			}

			if(process.server) {
				const requestHeaders = useRequestHeaders() || {};

				options.headers = {
					...options.headers,
					cookie: requestHeaders.cookie
				}
			}

			return await $fetch<R, string>(url, options);
		} catch(error) {
			const errorResponse = error as E;
			throw new ResponseError(errorResponse.data);
		}
	}

	toJSON() {
		return {};
	}
}
