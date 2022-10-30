import type { UserResponse } from '@/contracts';
import type { UserRequest } from '@/contracts';
import { User } from "@/models";
import fetchApi from "./fetchApi";

export default class UserService {
  static async create(body: UserRequest): Promise<User> {
		return User.fromUserResponse(
			await fetchApi<UserResponse>('/api/users', {method: 'POST', body})
		);
  }
}
