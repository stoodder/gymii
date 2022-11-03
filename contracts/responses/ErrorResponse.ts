import { ResponseError } from "@/errors";

export interface IErrorResponse {
	data: ResponseError;
}

export default class ErrorResponse implements IErrorResponse {
	data: ResponseError
}
