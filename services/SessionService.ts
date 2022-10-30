import type { SessionRequest } from '@/contracts';
import type { SessionResponse } from '@/contracts';
import { Session } from '@/models';
import { validateSessionRequest } from '@/validators';
import fetchApi from "./fetchApi";

export default class SessionService {
  static async create(body: SessionRequest): Promise<Session> {
		await validateSessionRequest(body);
		
		const response = await fetchApi<SessionResponse>('/api/sessions', {method: 'POST', body})

		return Session.fromSessionResponse(response);
  }
}
