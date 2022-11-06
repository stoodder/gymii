import BaseModel from './BaseModel';
import User from "./User";

interface ISession {
	user?: User;
}

export default class Session extends BaseModel implements ISession {
	toRequest?(): undefined

	user?: User;

	constructor(props: ISession = {}) {
		super();

		if (props.user) this.user = new User(props.user);
	}

	toJSON(): ISession {
		return {
			user: this.user
		}
	}
}
