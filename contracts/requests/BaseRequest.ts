import * as Yup from 'yup';
import type { RequestValidation, Properties } from "./types";
import { ValidationError } from "@/contracts/errors";
import { ErrorResponse } from '@/contracts/responses';
import { ResponseError } from '@/contracts/errors';
import { BaseResponse } from '@/contracts/responses';
import { BaseModel } from "@/models";
import { TypedInternalResponse, InternalApi } from 'nitropack';
import type { FetchOptions } from 'ohmyfetch';

export default abstract class BaseRequest<I, R extends BaseResponse<BaseModel>> {
	abstract get?(): Promise<R>;
	abstract put?(): Promise<R>;
	abstract post?(): Promise<R>;
	abstract patch?(): Promise<R>;
	abstract delete?(): Promise<R>;
	abstract toJSON(): I;
	
	async validate(shape: RequestValidation<I>) {
		try {
			await Yup.object(shape).validate(this, {abortEarly: false});
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

	async fetch<Route extends keyof InternalApi>(url: Route, options: FetchOptions = {}) {
		try {
			if(["POST", "PUT", "PATCH"].includes(options.method)) {
				options.body = this.toJSON();
			}

			if(process.server) {
				const requestHeaders = useRequestHeaders() || {};

				options.headers = {
					...options.headers,
					cookie: requestHeaders.cookie
				}
			}

			return await $fetch<TypedInternalResponse<Route>>(url, options)
		} catch(error) {
			const errorResponse = error as ErrorResponse;
			throw new ResponseError(errorResponse.data);
		}
	}
}
