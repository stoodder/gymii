import BaseModel from './BaseModel';
import { UserRequest } from '@/contracts';

interface IUser {
	id?: string;
	email?: string;
	name?: string;
	username?: string;
}

export default class User extends BaseModel implements IUser {
	id?: string;
	email?: string;
	name?: string;
	username?: string;

	constructor(props: IUser = {}) {
		super();
		this.id = props.id;
		this.email = props.email;
		this.name = props.name;
		this.username = props.username;
	}

	toRequest(): UserRequest {
		return new UserRequest(this)
	}

	toJSON(): IUser {
		return {
			id: this.id,
			email: this.email,
			username: this.username,
			name: this.name
		}
	}
}
