import errorHandler from "@/server/utils/errorHandler"

export default defineNitroPlugin((nitroApp) => {
	nitroApp.h3App.options.onError = errorHandler
})
