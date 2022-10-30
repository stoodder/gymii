import Serializer from "./Serializer";
import UserSerializer from "./UserSerializer";
import type { User } from "@/server/prisma";
import type { SessionResponse } from "@/contracts";

type Props = {
	user: User;
}

export default class SessionSerializer extends Serializer {
	private _user: User;

	constructor({user}: Props) {
		super();
		this._user = user;
	}

	get user(): UserSerializer {
		return new UserSerializer({user: this._user});
	}

	toJSON(): SessionResponse {
		return {
			user: this.user.toJSON()
		};
	}
}
