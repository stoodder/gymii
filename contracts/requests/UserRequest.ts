import BaseRequest from "./BaseRequest";
import { UserResponse } from "../responses";
import * as Yup from 'yup';

const validations = {
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
		.required("Retype password is required")
		.oneOf([Yup.ref('password'), null], 'Passwords must match'),
};

export interface IUserRequest {
	email: string;
	username: string;
	name: string;
	password: string;
	retypePassword?: string;
}

export default class CreateUserRequest
extends BaseRequest<UserResponse>
implements IUserRequest {
	email: string;
	username: string;
	name: string;
	password: string;
	retypePassword?: string;

	constructor(props: IUserRequest) {
		super();
		this.email = props.email;
		this.username = props.username;
		this.name = props.name;
		this.password = props.password;
		this.retypePassword = props.retypePassword;
	}

	async validate() {
		return await super.validate<IUserRequest>(validations);
	}

	async create(): Promise<UserResponse> {
		await this.validate();
		const data = await super.fetch("/api/users", {method: "POST"});
		return new UserResponse(data);
	}

	toJSON(): IUserRequest {
		return {
			username: this.username,
			email: this.email,
			name: this.name,
			password: this.password
		};
	}
}
