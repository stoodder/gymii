import BaseResponse from './BaseResponse';
import { UserResponse, IUserResponse } from '@/contracts/responses';
import { Session } from '@/models';

export interface ISessionResponse {
	user: IUserResponse;
}

export default class SessionResponse
extends BaseResponse<Session>
implements ISessionResponse {
	user: UserResponse;

	constructor(props: ISessionResponse) {
		super();
		this.user = new UserResponse(props.user);
	}

	toJSON(): ISessionResponse {
		return {
			user: this.user
		}
	}

	toModel(): Session {
		return new Session({
			user: this.user?.toModel()
		});
	}
}
