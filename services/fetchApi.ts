import { ResponseError } from '@/errors';
import type { ErrorResponse } from '@/contracts/responses';

export default async function fetchApi<
	ResponseType,
	ErrorResponseType extends ErrorResponse = ErrorResponse
>(url: string, options: any): Promise<ResponseType> {
	try {
		return await $fetch(url, options);
	} catch(error) {
		const errorResponse = error as ErrorResponseType;
		throw new ResponseError(errorResponse.data);
	}
}
