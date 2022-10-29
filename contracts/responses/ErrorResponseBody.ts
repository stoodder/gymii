export default interface ErrorResponseBody {
	message: string;
	statusCode: number;
	errors?: {[key: string]: string};
}
