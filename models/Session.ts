import BaseModel, { BaseModelInterface } from './BaseModel';
import type { SessionResponse } from "@/contracts/responses";
import User from "./User";

export interface SessionInterface extends BaseModelInterface {
  user?: User;
}

export default class Session extends BaseModel implements SessionInterface {
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
