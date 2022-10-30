import { ResponseError } from '@/errors';
import type { ErrorResponse } from '@/contracts';

export default async function fetchApi<
	ResponseType,
	ErrorResponseType extends ErrorResponse = ErrorResponse
>(url: string, options: any): Promise<ResponseType> {
	try {
		if(process.server) {
			const requestHeaders = useRequestHeaders() || {};
			options = {...options}
			options.headers = {
				...options.headers,
				cookie: requestHeaders.cookie
			}
		}

		return await $fetch(url, options);
	} catch(error) {
		const errorResponse = error as ErrorResponseType;
		throw new ResponseError(errorResponse.data);
	}
}
