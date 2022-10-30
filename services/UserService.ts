import type { UserResponse } from '@/contracts';
import type { CreateUserRequest } from '@/contracts';
import { User } from "@/models";
import fetchApi from "./fetchApi";
import { validateCreateUserRequest } from '@/validators';

export default class UserService {
  static async register(body: CreateUserRequest): Promise<User> {
		await validateCreateUserRequest(body);


		const response = await fetchApi<UserResponse>('/api/users', {
			method: 'POST',
			body: {...body, ...{repeatPassword: undefined}}
		})

		return User.fromUserResponse(response);
  }
}
