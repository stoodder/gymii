// This is a separate file so that it can be included in both unit tests and the server code.
// since vitest can't resolve defineNitroPlugin, we have to use a separate file for the plugin.
import { H3Response, H3Error, H3Event, MIMES } from "h3";
import { ResponseError } from "@/contracts/errors";
import { InternalServerError } from "@/contracts/errors";

export default (error: H3Error, event: H3Event) => {
	let responseError = error.data;

	if(!responseError) {
		responseError = new InternalServerError(error.message);
	} else if(!(responseError.data instanceof ResponseError)) {
		responseError = new InternalServerError(error.message);
	}

	event.res.statusCode = responseError.statusCode
	event.res.statusMessage = responseError.message
	event.res.setHeader('Content-Type', MIMES.json)
	event.res.end(JSON.stringify(responseError.toJSON()))
}
