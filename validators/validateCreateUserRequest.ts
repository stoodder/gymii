import * as Yup from 'yup';
import createValidator from "./createValidator";
import type { CreateUserRequest } from "@/contracts";

export default createValidator<CreateUserRequest>({
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
});
