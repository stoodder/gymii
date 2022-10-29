import type { UserResponse } from '@/contracts/responses';
import type { UserRequest } from '@/contracts/requests';
import { User } from "@/models";

export default class SessionService {
  static async create(body: UserRequest): Promise<User> {
    const response = await useFetch<UserResponse>('/api/users', {body, method: 'POST'});

		return User.fromUserResponse(response.data.value);
  }
}
