export interface BaseModelInterface {
	id?: string;
}

export default class BaseModel implements BaseModelInterface {
	id?: string;

  constructor(props: BaseModelInterface) {
		Object.assign(this, props);
  }

	toJSON(): {[key in keyof BaseModelInterface]: any} {
		return {
			id: this.id
		}
	}
}
