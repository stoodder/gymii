import { ResponseError, IResponseError } from "@/contracts/errors";
import { BaseRequest } from "@/contracts/requests";

export interface IErrorResponse {
	data: IResponseError<any>;
}

export default class ErrorResponse implements IErrorResponse {
	data: ResponseError

	toJSON(): IErrorResponse {
		return {
			data: this.data?.toJSON()
		}
	}
}
