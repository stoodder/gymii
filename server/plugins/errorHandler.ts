import { H3Response } from "h3";
import { ResponseError } from "@/server/errors";
import { InternalServerError } from "@/server/errors";

export default defineNitroPlugin((nitroApp) => {
	nitroApp.h3App.options.onError = (error, event) => {
		if(!(error instanceof ResponseError)) {
			error = new InternalServerError(error.message);
		}

		if(!(error instanceof ResponseError)) {
			// TODO: Determine a better way to handle this, we should never see this
			throw error;
		}
		
		const response = new H3Response(error.toJSON(), {
			status: error.statusCode,
			statusText: error.message
		});

		event.respondWith(response)
	}
})
