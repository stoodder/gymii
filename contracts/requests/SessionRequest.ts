import BaseRequest from "./BaseRequest";
import { SessionResponse } from "@/contracts/responses";
import * as Yup from 'yup';

const validations = {
	username: Yup.string()
		.min(3, 'Username must be at least 3 characters')
		.max(24, 'Username must be at most 24 characters')
		.matches(/^[^\s].*[^\s]$/, 'Username must not start or end with whitespace')
		.matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores')
		.required("Username is required"),
	password: Yup.string()
		.required("Password is required"),
};

export interface ISessionRequest {
	username?: string;
	password?: string;
}

export default class SessionRequest
extends BaseRequest<SessionResponse>
implements ISessionRequest {
	username: string;
	password: string;

	constructor(props: ISessionRequest = {}) {
		super();
		this.username = props.username;
		this.password = props.password;
	}

	validate() {
		return super.validate<ISessionRequest>(validations);
	}

	async get(): Promise<SessionResponse> {
		const data = await super.fetch("/api/sessions", {method: "GET"});
		return new SessionResponse(data);
	}

	async post(): Promise<SessionResponse> {
		await this.validate();
		const data = await super.fetch("/api/sessions", {method: "POST"});
		return new SessionResponse(data);
	}

	async delete(): Promise<SessionResponse> {
		const data = await super.fetch("/api/sessions", {method: "DELETE"});
		return new SessionResponse(data);
	}

	toJSON(): ISessionRequest {
		return {
			username: this.username,
			password: this.password
		}
	}
}
