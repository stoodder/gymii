import type { RequestValidation } from "./types";
import * as Yup from 'yup';
import BaseRequest from "./BaseRequest";
import { SessionResponse } from "@/contracts/responses";

export interface ISessionRequest {
	username?: string;
	password?: string;
}

const validations: RequestValidation<ISessionRequest> = {
	username: Yup.string()
		.min(3, 'Username must be at least 3 characters')
		.max(24, 'Username must be at most 24 characters')
		.matches(/^[^\s].*[^\s]$/, 'Username must not start or end with whitespace')
		.matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores')
		.required("Username is required"),
	password: Yup.string()
		.required("Password is required"),
};

export default class SessionRequest
extends BaseRequest<ISessionRequest, SessionResponse>
implements ISessionRequest {
	put?(): undefined
	patch?(): undefined

	username: string;
	password: string;

	constructor(props: ISessionRequest = {}) {
		super();
		this.username = props.username;
		this.password = props.password;
	}

	async validate() {
		return await super.validate(validations);
	}

	async get() {
		const data = await super.fetch("/api/sessions", {method: "GET"});
		return new SessionResponse(data);
	}

	async post() {
		await this.validate();
		const data = await super.fetch("/api/sessions", {method: "POST"});
		return new SessionResponse(data);
	}

	async delete() {
		const data = await super.fetch("/api/sessions", {method: "DELETE"});
		return new SessionResponse(data);
	}

	toJSON(): ISessionRequest {
		return {
			username: this.username,
			password: this.password,
		}
	}
}
