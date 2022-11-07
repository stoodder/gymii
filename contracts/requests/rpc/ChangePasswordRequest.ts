import * as Yup from 'yup';
import type { RequestValidation } from "@/contracts/requests";
import { BaseRequest } from "@/contracts/requests";
import { ChangePasswordResponse } from "@/contracts/responses";

export interface IChangePasswordRequest {
	password?: string;
	newPassword?: string;
	retypePassword?: string;
}

const validations: RequestValidation<IChangePasswordRequest> = {
	password: Yup.string()
		.required("Password is required"),
	newPassword: Yup.string()
		.required("New password is required")
		.min(8, 'Password must be at least 8 characters')
		.oneOf([Yup.ref('password'), null], 'New password cannot be the same as the current password'),
	retypePassword: Yup.string()
		.notRequired()
		.oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
};


export default class ChangePasswordRequest extends BaseRequest<IChangePasswordRequest, ChangePasswordResponse> implements IChangePasswordRequest {
	get?(): undefined;
	put?(): undefined;
	patch?(): undefined;
	delete?(): undefined;

	public password?: string;
	public newPassword?: string;
	public retypePassword?: string;

	constructor(props: IChangePasswordRequest = {}) {
		super();
		this.password = props.password;
		this.newPassword = props.newPassword;
		this.retypePassword = props.retypePassword;
	}

	async validate(subset: Array<keyof Partial<IChangePasswordRequest>> = undefined) {
		return await super.executeValidations(validations, subset);
	}

	async post(): Promise<ChangePasswordResponse> {
		await this.validate(['password', 'newPassword', 'retypePassword']);

		const data = await super.fetch("/api/rpc/change-password", {
			method: "PUT",
			body: this.serialize(['password', 'newPassword'])
		});

		return new ChangePasswordResponse(data);
	}

	toJSON(): IChangePasswordRequest {
		return {
			password: this.password,
			newPassword: this.newPassword
		};
	}
}
