import type { SessionRequest } from '@/contracts/requests';
import type { SessionResponse } from '@/contracts/responses';
import { Session } from '@/models';

export default class SessionService {
  static async create(body: SessionRequest): Promise<Session> {
    const response = await useFetch<SessionResponse>('/api/sessions', {body, method: 'POST'});

		return Session.fromSessionResponse(response.data.value);
  }
}
