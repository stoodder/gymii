import { AnySchema } from 'yup';

export type RequestValidation<T> = {[key in keyof T]: AnySchema}
