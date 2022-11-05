import * as Yup from 'yup';
import type { Errors } from "@/contracts/errors/types";
import type { RequestValidation } from "./types";
import { ValidationError } from "@/contracts/errors";
import { ErrorResponse } from '@/contracts/responses';
import { ResponseError } from '@/contracts/errors';
import { BaseResponse } from '@/contracts/responses';
import { BaseModel } from "@/models";
import { TypedInternalResponse, InternalApi } from 'nitropack';

type FetchOptions<I> = {
	method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
	headers?: HeadersInit;
	body?: Partial<I>,
	substitutions?: {[key in keyof Partial<I>]: string | number}
}

export default abstract class BaseRequest<I, R extends BaseResponse<BaseModel>> {
	abstract get?(): Promise<R>;
	abstract put?(): Promise<R>;
	abstract post?(): Promise<R>;
	abstract patch?(): Promise<R>;
	abstract delete?(): Promise<R>;
	abstract validate(subset: Array<keyof Partial<I>>): Promise<void>;
	abstract toJSON(): I;
	
	protected async executeValidations(
		shape: RequestValidation<I>,
		props: Array<keyof Partial<I>> = undefined
	) {
		try {
			let subsetShape: Partial<RequestValidation<I>>;

			if(props && props.length > 0) {
				subsetShape = {};
				for(let index in props) {
					const prop = props[index] as string;
					subsetShape[prop] = shape[prop];
				}
			}

			await Yup.object(subsetShape || shape).validate(this, {abortEarly: false});
		} catch(e) {
			if(!(e instanceof Yup.ValidationError)) {
				throw e;
			}

			const errors = e.inner.reduce((acc, error) => {
				acc[error.path] = error.errors[0];
				return acc;
			}, {});

			throw new ValidationError(errors as Errors<I>);
		}
	}

	async fetch<Route extends keyof InternalApi>(
		url: Route,
		options: FetchOptions<I> = {method: "GET"},
	) {
		try {
			if(process.server) {
				options.headers = {
					...options.headers,
					...useRequestHeaders(['cookie'])
				}
			}

			let constructedUrl = url as string;

			if(options.substitutions) {
				for(let key in options.substitutions) {
					constructedUrl = constructedUrl.replace(`:${key}`, encodeURIComponent(options.substitutions[key] as string));
				}

				options = {...options, substitutions: undefined};
			}

			return await $fetch<TypedInternalResponse<Route>>(constructedUrl, options)
		} catch(error) {
			const errorResponse = error as ErrorResponse;
			throw new ResponseError(errorResponse.data);
		}
	}

	serialize(props: Array<keyof Partial<I>>): Partial<I> {
		const json = {};

		for(let index in props) {
			const prop = props[index] as string;
			if(this[prop]?.toJSON) {
				json[prop] = this[prop].toJSON();
			} else {
				json[prop] = this[prop];
			}
		}

		return json;
	}
}
