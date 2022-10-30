import type { SessionRequest } from '@/contracts';
import type { SessionResponse } from '@/contracts';
import { Session } from '@/models';
import fetchApi from "./fetchApi";

export default class SessionService {
  static async create(body: SessionRequest): Promise<Session> {
		return Session.fromSessionResponse(
			await fetchApi<SessionResponse>('/api/sessions', {method: 'POST', body})
		);
  }
}
