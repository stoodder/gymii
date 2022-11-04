import { H3Response, H3Error, H3Event, sendError } from "h3";
import { ResponseError } from "@/contracts/errors";
import { InternalServerError } from "@/contracts/errors";

export default defineNitroPlugin((nitroApp) => {
	nitroApp.h3App.options.onError = (error: H3Error, event: H3Event) => {
		let responseError = error.data;

		if(!responseError) {
			responseError = new InternalServerError(error.message);
		} else if(!(responseError.data instanceof ResponseError)) {
			responseError = new InternalServerError(error.message);
		}
		
		const response = new H3Response(responseError.toJSON(), {
			status: responseError.statusCode,
			statusText: responseError.message
		});

		event.respondWith(response)
	}
})
