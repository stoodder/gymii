import Serializer from "./Serializer";
import type { User } from "@/server/prisma";
import type { UserResponse } from "@/contracts";

type Props = {
	user: User;
}

export default class UserSerializer extends Serializer {
	private _user: User;

	constructor({user}: Props) {
		super();
		this._user = user;
	}

	get id(): string {
		return this._user.id;
	}

	get email(): string {
		return this._user.email;
	}

	get name(): string {
		return this._user.name;
	}

	toJSON(): UserResponse {
		return {
			id: this.id,
			email: this.email,
			name: this.name
		}
	}
}
