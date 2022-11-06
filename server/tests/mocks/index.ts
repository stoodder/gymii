import supertest, { SuperTest, Test } from 'supertest';
import { createApp, toNodeListener, App, EventHandler } from 'h3';
import errorHandler from '@/server/utils/errorHandler';
import { vi } from "vitest";
import "./setup";

export type MockApi = {
	app: App,
	request: SuperTest<Test>,
	eventHandler: EventHandler,
	reset: () => void,
}

export default async (apiRoute: string, eventFilePath: string): Promise<MockApi> => {
	const app = createApp({onError: errorHandler});
	const request = supertest(toNodeListener(app));
	const eventHandler = (await import(eventFilePath)).default;
	const reset = () => vi.clearAllMocks()

	app.use(apiRoute, eventHandler);

	return {app, request, eventHandler, reset}
}
