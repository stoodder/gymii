import type { SessionRequest } from '@/contracts';
import type { SessionResponse } from '@/contracts';
import { Session } from '@/models';
import { validateSessionRequest } from '@/validators';
import fetchApi from "./fetchApi";

export default class SessionService {
  static async login(body: SessionRequest): Promise<Session> {
		await validateSessionRequest(body);
		
		const response = await fetchApi<SessionResponse>('/api/sessions', {method: 'POST', body})

		return Session.fromSessionResponse(response);
  }

	static async logout(): Promise<Session> {
		const response = await fetchApi<SessionResponse>('/api/sessions', {method: 'DELETE'})

		return Session.fromSessionResponse(response);
	}

	static async restoreSession(): Promise<Session> {
		try {
			const response = await fetchApi<SessionResponse>('/api/sessions', {method: 'GET'})

			return Session.fromSessionResponse(response);
		} catch (error) {
			console.log("Skipping error");
		}
	}
}
