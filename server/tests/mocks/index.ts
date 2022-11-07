import "./setup"; // Must be first import
import supertest, { SuperTest, Test } from 'supertest';
import { createApp, toNodeListener, App, EventHandler, createRouter } from 'h3';
import errorHandler from '@/server/utils/errorHandler';
import { vi } from "vitest";
import { AuthService } from "@/server/services";

export type MockApi = {
	app: App,
	request: SuperTest<Test>,
	eventHandler: EventHandler,
	reset: () => void,
}

export function createAuthCookieString(id: string): string {
	return `session=${AuthService.createAuthToken(id)}; Path=/; HttpOnly`;
}

export default async (apiRoute: string, eventFilePath: string): Promise<MockApi> => {
	try {
		const app = createApp({onError: errorHandler});
		const router = createRouter();
		const request = supertest(toNodeListener(app));
		const importDef = await import(eventFilePath);
		const eventHandler = importDef.default;
		const reset = () => vi.clearAllMocks();

		router.add(apiRoute, eventHandler);
		app.use(router);
	
		return {app, request, eventHandler, reset}
	} catch (e) {
		console.error(e);
		throw e;
	}
}
