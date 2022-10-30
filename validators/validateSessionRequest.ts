import * as Yup from 'yup';
import createValidator from "./createValidator";
import type { SessionRequest } from "@/contracts";

export default createValidator<SessionRequest>({
	username: Yup.string()
		.min(3, 'Username must be at least 3 characters')
		.max(24, 'Username must be at most 24 characters')
		.matches(/^[^\s].*[^\s]$/, 'Username must not start or end with whitespace')
		.matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores')
		.required("Username is required"),
	password: Yup.string()
		.required("Password is required"),
});
