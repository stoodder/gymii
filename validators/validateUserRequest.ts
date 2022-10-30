import * as Yup from 'yup';
import createValidator from "./createValidator";
import type { UserRequest } from "@/contracts";

export default createValidator<UserRequest>({
	email: Yup.string()
		.email("Email is not a valid email address")
		.required("Email is required"),
	password: Yup.string()
		.required("Password is required"),
	name: Yup.string()
		.required("Name is required"),
});
