import { AnySchema } from 'yup';

export type PropertyNames<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T];
export type Properties<T> = Pick<T, PropertyNames<T>>;
export type RequestValidation<T> = {[key in keyof Properties<T>]: AnySchema}
