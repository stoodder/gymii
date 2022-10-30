import type { UserResponse } from '@/contracts';
import type { UserRequest } from '@/contracts';
import { User } from "@/models";
import fetchApi from "./fetchApi";
import { validateUserRequest } from '@/validators';

export default class UserService {
  static async register(body: UserRequest): Promise<User> {
		await validateUserRequest(body);

		const response = await fetchApi<UserResponse>('/api/users', {method: 'POST', body})

		return User.fromUserResponse(response);
  }
}
