import * as Yup from 'yup';
import { ValidationError } from "@/errors";

export default function createValidator<T>(shape: {[K in keyof T]: Yup.AnySchema}) {
	const schema = Yup.object(shape);

	return async (data: T) => {
		try {
			await schema.validate(data, {abortEarly: false, stripUnknown: true});
		} catch(e) {
			if(!(e instanceof Yup.ValidationError)) {
				throw e;
			}

			const errors = e.inner.reduce((acc, error) => {
				acc[error.path] = error.errors[0];
				return acc;
			}, {});

			throw new ValidationError(errors);
		}
	}
}
