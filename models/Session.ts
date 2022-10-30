import BaseModel, { BaseModelInterface } from './BaseModel';
import type { SessionResponse } from "@/contracts";
import User from "./User";

export interface SessionInterface extends BaseModelInterface {
	email?: string;
	password?: string;
  user?: User;
}

export default class Session extends BaseModel implements SessionInterface {
	email?: string;
	password?: string;
  user?: User;

	static fromSessionResponse(data: SessionResponse): Session {
		return new Session({
			user: User.fromUserResponse(data.user)
		});
	}

  constructor(props: SessionInterface) {
		super(props);
		Object.assign(this, props);
  }
}
