import type { UserResponse } from '@/contracts/responses';
import type { UserRequest } from '@/contracts/requests';
import { User } from "@/models";
import { useApiPost } from '@/services/hooks';

export default class UserService {
  static async create(body: UserRequest): Promise<User> {
		const data = await useApiPost<UserResponse>('/api/users', body);

		return User.fromUserResponse(data);
  }
}
