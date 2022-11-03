import BaseModel, { BaseModelInterface } from './BaseModel';
import { UserResponse } from "@/contracts";

export interface UserInterface extends BaseModelInterface {
	id?: string;
  email?: string;
  name?: string;
	username?: string;
}

export default class User extends BaseModel implements UserInterface {
	id?: string;
  email?: string;
  name?: string;
	username?: string;

	static fromUserResponse(data: UserResponse): User {
		return new User({
			id: data.id,
			username: data.username,
			email: data.email,
			name: data.name
		})
	}

  constructor(props: UserInterface) {
    super(props);
		this.id = props.id;
		this.email = props.email;
		this.username = props.username;
		this.name = props.name;
  }

	toJSON(): {[key in keyof UserInterface]: any} {
		return {
			...super.toJSON(),
			id: this.id,
			email: this.email,
			username: this.username,
			name: this.name
		}
	}
}
