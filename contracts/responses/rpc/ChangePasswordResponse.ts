import { BaseResponse } from "@/contracts/responses";

export interface IChangePasswordResponse {
	success?: boolean;
}

export default class ChangePasswordResponse extends BaseResponse implements IChangePasswordResponse {
	toModel?(): undefined

	success?: boolean;

	constructor(props: IChangePasswordResponse) {
		super();
		this.success = props.success;
	}

	toJSON(): IChangePasswordResponse {
		return {
			success: this.success,
		};
	}
}
