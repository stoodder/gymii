import BaseResponse from './BaseResponse';
import { User } from '@/models';

export interface IUserResponse {
	id: string;
	email: string;
	username: string;
	name: string;
}

export default class UserResponse
extends BaseResponse<User>
implements IUserResponse {
	id: string;
	username: string;
	email: string;
	name: string;

	constructor(props: IUserResponse) {
		super();
		this.id = props.id;
		this.username = props.username;
		this.email = props.email;
		this.name = props.name;
	}

	toJSON(): IUserResponse {
		return {
			id: this.id,
			email: this.email,
			username: this.username,
			name: this.name
		}
	}

	toModel(): User {
		return new User({
			id: this.id,
			email: this.email,
			username: this.username,
			name: this.name
		});
	}
}
