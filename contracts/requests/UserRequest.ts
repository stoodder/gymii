import type { RequestValidation } from "./types";
import BaseRequest from "./BaseRequest";
import { UserResponse } from "../responses";
import * as Yup from 'yup';

export interface IUserRequest {
	email?: string;
	username?: string;
	name?: string;
	password?: string;
	retypePassword?: string;
}

const validations: RequestValidation<IUserRequest> = {
	username: Yup.string()
		.min(3, 'Username must be at least 3 characters')
		.max(24, 'Username must be at most 24 characters')
		.matches(/^[^\s].*[^\s]$/, 'Username must not start or end with whitespace')
		.matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores')
		.required("Username is required"),
	email: Yup.string()
		.email("Email is not a valid email address")
		.required("Email is required"),
	name: Yup.string()
		.required("Name is required"),
	password: Yup.string()
		.required("Password is required"),
	retypePassword: Yup.string()
		.notRequired()
		.oneOf([Yup.ref('password'), null], 'Passwords must match'),
};

export default class CreateUserRequest
extends BaseRequest<IUserRequest, UserResponse>
implements IUserRequest {
	get?(): undefined;
	put?(): undefined;
	patch?(): undefined;
	delete?(): undefined;

	_email?: string;
	_username?: string;
	name?: string;
	password?: string;
	retypePassword?: string;

	constructor(props: IUserRequest = {}) {
		super();
		Object.assign(this, props);
		// this.email = props.email;
		// this.username = props.username;
		// this.name = props.name;
		// this.password = props.password;
		// this.retypePassword = props.retypePassword;
	}

	get email(): string { return this._email; }
	set email(value: string) { this._email = value?.trim().toLowerCase() || ""; }

	get username(): string { return this._username; }
	set username(value: string) { this._username = value?.trim().toLowerCase() || ""; }

	async validate() {
		return await super.validate(validations);
	}

	async post() {
		await this.validate();
		const data = await super.fetch("/api/users", {method: "POST"});
		return new UserResponse(data);
	}

	toJSON(): IUserRequest {
		return {
			username: this.username,
			email: this.email,
			name: this.name,
			password: this.password,
			retypePassword: this.retypePassword
		};
	}
}
