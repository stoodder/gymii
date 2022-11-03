export interface BaseModelInterface {

}

export default class BaseModel implements BaseModelInterface {
  constructor(props: BaseModelInterface) {
		Object.assign(this, props);
  }

	toJSON(): {[key in keyof BaseModelInterface]: any} {
		return {}
	}
}
