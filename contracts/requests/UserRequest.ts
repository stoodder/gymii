import type { RequestValidation } from "./types";
import BaseRequest from "./BaseRequest";
import { UserResponse } from "../responses";
import * as Yup from 'yup';

export interface IUserRequest {
	id?: string;
	email?: string;
	username?: string;
	name?: string;
	password?: string;
	retypePassword?: string;
}

const validations: RequestValidation<IUserRequest> = {
	id: Yup.string()
		.required("Id is required")
		.uuid("Id must be a valid UUID"),
	username: Yup.string()
		.required("Username is required")
		.min(3, 'Username must be at least 3 characters')
		.max(24, 'Username must be at most 24 characters')
		.matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
	email: Yup.string()
		.required("Email is required")
		.email("Email is not a valid email address"),
	name: Yup.string()
		.required("Name is required"),
	password: Yup.string()
		.required("Password is required")
		.min(8, 'Password must be at least 8 characters'),
	retypePassword: Yup.string()
		.notRequired()
		.oneOf([Yup.ref('password'), null], 'Passwords must match'),
};

export default class UserRequest
extends BaseRequest<IUserRequest, UserResponse>
implements IUserRequest {
	get?(): undefined;
	patch?(): undefined;
	delete?(): undefined;

	id?: string;
	_email?: string;
	_username?: string;
	name?: string;
	password?: string;
	retypePassword?: string;

	constructor(props: IUserRequest = {}) {
		super();
		this.id = props.id;
		this.email = props.email;
		this.username = props.username;
		this.name = props.name;
		this.password = props.password;
		this.retypePassword = props.retypePassword;
	}

	get email(): string | undefined { return this._email; }
	set email(value: string | undefined) { this._email = value?.trim().toLowerCase(); }

	get username(): string | undefined { return this._username; }
	set username(value: string | undefined) { this._username = value?.trim().toLowerCase(); }

	async validate(subset: Array<keyof Partial<IUserRequest>> = undefined) {
		return await super.executeValidations(validations, subset);
	}

	async post() {
		await this.validate(['username', 'name', 'email', 'password', 'retypePassword']);

		const data = await super.fetch("/api/users", {
			method: "POST",
			body: this.serialize(['username', 'name', 'email', 'password'])
		});

		return new UserResponse(data);
	}

	async put() {
		await this.validate(['username', 'name', 'email']);

		const data = await super.fetch(`/api/users/:id`, {
			method: "PUT",
			body: this.serialize(['username', 'name', 'email']),
			substitutions: {
				id: this.id
			}
		});

		return new UserResponse(data);
	}

	toJSON(): IUserRequest {
		return {
			id: this.id,
			username: this.username,
			email: this.email,
			name: this.name,
			password: this.password,
			retypePassword: this.retypePassword
		};
	}
}
