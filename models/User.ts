import BaseModel from './BaseModel';

export interface IUser {
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

  constructor(props: IUser) {
    super();
		this.id = props.id;
		this.email = props.email;
		this.username = props.username;
		this.name = props.name;
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
