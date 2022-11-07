import { readBody, H3Event } from "h3";

export default async function pickBody<T = any>(event: H3Event, props?: Array<keyof T>): Promise<Partial<T>> {
	const body = await readBody<T>(event);

	if(!props) {
		return body;
	}

	const result = {} as Partial<T>;

	props.forEach(prop => {
		if(typeof body[prop] !== 'undefined') {
			result[prop] = body[prop];
		}
	});

	return result;
}
