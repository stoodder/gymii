export default interface ErrorResponse {
	message: string;
	statusCode: number;
	errors?: {[key: string]: string};
}
