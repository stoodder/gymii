import type { SessionRequest } from '@/contracts/requests';
import type { SessionResponse } from '@/contracts/responses';
import { Session } from '@/models';
import fetchApi from "./fetchApi";

export default class SessionService {
  static async create(body: SessionRequest): Promise<Session> {
		return Session.fromSessionResponse(
			await fetchApi<SessionResponse>('/api/sessions', {method: 'POST', body})
		);
  }
}
