import { ResponseError, IResponseError } from "@/errors";

export interface IErrorResponse {
	data: IResponseError;
}

export default class ErrorResponse implements IErrorResponse {
	data: ResponseError

	toJSON(): IErrorResponse {
		return {
			data: this.data.toJSON()
		}
	}
}
