import { H3Response, H3Error, H3Event } from "h3";
import { ResponseError } from "@/errors";
import { InternalServerError } from "@/errors";

export default defineNitroPlugin((nitroApp) => {
	nitroApp.h3App.options.onError = (error: H3Error, event: H3Event) => {
		let responseError = error.data;

		if(!responseError) {
			event.respondWith(new H3Response(error.toJSON(), {
				status: error.statusCode,
				statusText: error.message
			}))
		}

		if(!(responseError.data instanceof ResponseError)) {
			responseError = new InternalServerError(error.message);
		}
		
		const response = new H3Response(responseError.toJSON(), {
			status: responseError.statusCode,
			statusText: responseError.message
		});

		event.respondWith(response)
	}
})
