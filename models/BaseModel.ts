export interface BaseModelInterface {
	id?: string;
}

export default class BaseModel implements BaseModelInterface {
	id?: string;
  validations: any = {};
  errors?: any;

  constructor(props: BaseModelInterface) {
		Object.assign(this, props);
  }

  get isValid(): boolean {
    return !this.errors;
  }

	get isNew(): boolean {
		return !this.id;
	}
}
