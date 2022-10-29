import type { SessionRequest } from '@/contracts/requests';
import type { SessionResponse } from '@/contracts/responses';
import { Session } from '@/models';
import { useApiPost } from '@/services/hooks';

export default class SessionService {
  static async create(body: SessionRequest): Promise<Session> {
    const data = await useApiPost<SessionResponse>('/api/sessions', body);

		return Session.fromSessionResponse(data);
  }
}
