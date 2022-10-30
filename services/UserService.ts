import type { UserResponse } from '@/contracts/responses';
import type { UserRequest } from '@/contracts/requests';
import { User } from "@/models";
import fetchApi from "./fetchApi";

export default class UserService {
  static async create(body: UserRequest): Promise<User> {
		return User.fromUserResponse(
			await fetchApi<UserResponse>('/api/users', {method: 'POST', body})
		);
  }
}
