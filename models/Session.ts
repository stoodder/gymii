import BaseModel from './BaseModel';
import User, {IUser} from "./User";

export interface ISession {
	email?: string;
	user?: IUser;
}

export default class Session
extends BaseModel
implements ISession {
	email?: string;
	user?: User;

	constructor(props: ISession) {
		super();
		this.email = props.email;

		if(props.user) {
			this.user = new User( props.user );
		}
	}

	toJSON(): ISession {
		return {
			email: this.email,
			user: this.user?.toJSON()
		}
	}
}
