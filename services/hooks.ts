import { ResponseError } from '@/errors';

type RequestOptions = {
	url: string,
	method: "GET" | "POST" | "PUT" | "DELETE",
	body?: any
}

type ErrorResponse = {
	data: ResponseError
}

async function useApiRequest<T>({url, method, body}: RequestOptions): Promise<T> {
	const { data, error } = await useFetch<T, ErrorResponse>(url, { body, method });

	if(error) {
		const {statusCode, message, errors} = ( error.value as ErrorResponse ).data
		throw new ResponseError(statusCode, message, errors)
	} else {
		return data.value as T
	}
}

export function useApiGet<T>(url: string, body: any): Promise<T> {
	return useApiRequest<T>({url, method: 'GET', body});
}

export function useApiPost<T>(url: string, body: any): Promise<T> {
	return useApiRequest<T>({url, method: 'POST', body});
}

export function useApiPut<T>(url: string, body: any): Promise<T> {
	return useApiRequest<T>({url, method: 'PUT', body});
}

export function useApiDelete<T>(url: string, body: any): Promise<T> {
	return useApiRequest<T>({url, method: 'DELETE', body});
}
