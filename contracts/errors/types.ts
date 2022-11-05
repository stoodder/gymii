export type NonFunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T];
export type Errors<T> = {[key in keyof Partial<NonFunctionPropertyNames<T>>]: string};
