import * as Yup from 'yup';
import createValidator from "./createValidator";
import type { SessionRequest } from "@/contracts";

export default createValidator<SessionRequest>({
	email: Yup.string()
		.email("Email is not a valid email address")
		.required("Email is required"),
	password: Yup.string()
		.required("Password is required"),
});
