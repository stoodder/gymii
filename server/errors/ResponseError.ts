import { H3Error } from "h3";
import type { ErrorResponseBody } from "@/contracts/responses";

export default class ResponseError extends H3Error implements ErrorResponseBody {
	message: string;

	constructor(statusCode: number, message: string = "Response error") {
		super(message);
		this.statusCode = statusCode;
	}

	toJSON() {
		return {
			statusCode: this.statusCode,
			message: this.message,
		};
	}
}
