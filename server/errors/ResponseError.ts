export default class ResponseError extends Error {
	statusCode: number;
	message: string;

	constructor(statusCode: number, message: string = "Response error") {
		super(message);
		this.statusCode = statusCode;
	}
}
