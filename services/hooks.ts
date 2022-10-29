import type { ErrorResponse } from '@/contracts/responses';

type RequestOptions = {
	url: string,
	method: "GET" | "POST" | "PUT" | "DELETE",
	body?: any
}

async function useApiRequest<T, E extends ErrorResponse>({url, method, body}: RequestOptions): Promise<T> {
	const { data, error } = await useFetch<T, E>(url, { body, method });

	if(error) {
		console.dir(error);
		throw ( error.value as E ).data
	} else {
		return data.value as T
	}
}

export function useApiGet<T>(url: string, body: any): Promise<T> {
	return useApiRequest<T, ErrorResponse>({url, method: 'GET', body});
}

export function useApiPost<T>(url: string, body: any): Promise<T> {
	return useApiRequest<T, ErrorResponse>({url, method: 'POST', body});
}

export function useApiPut<T>(url: string, body: any): Promise<T> {
	return useApiRequest<T, ErrorResponse>({url, method: 'PUT', body});
}

export function useApiDelete<T>(url: string, body: any): Promise<T> {
	return useApiRequest<T, ErrorResponse>({url, method: 'DELETE', body});
}
