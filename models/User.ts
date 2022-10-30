import BaseModel, { BaseModelInterface } from './BaseModel';
import { UserResponse } from "@/contracts";

export interface UserInterface extends BaseModelInterface {
  email?: string;
	password?: string;
  name?: string;
}

export default class User extends BaseModel implements UserInterface {
  email?: string;
	password?: string;
  name?: string;

	static fromUserResponse(data: UserResponse): User {
		return new User({
			id: data.id,
			email: data.email,
			name: data.name
		})
	}

  constructor(props: UserInterface) {
    super(props);
		Object.assign(this, props);
  }
}
