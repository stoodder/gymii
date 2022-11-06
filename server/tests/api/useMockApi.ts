import supertest, { SuperTest, Test } from 'supertest';
import { createApp, toNodeListener, App, EventHandler } from 'h3';
import errorHandler from '@/server/utils/errorHandler';
import { vi } from "vitest";
import "./mock";

export type MockApi = {
	app: App,
	request: SuperTest<Test>,
	eventHandler: EventHandler,
	clearMocks: () => void,
}

export default async (apiRoute: string, eventFilePath: string): Promise<MockApi> => {
	const app = createApp({onError: errorHandler});
	const request = supertest(toNodeListener(app));
	const eventHandler = (await import(eventFilePath)).default;
	const clearMocks = () => vi.clearAllMocks()

	app.use(apiRoute, eventHandler);

	return {app, request, eventHandler, clearMocks}
}
