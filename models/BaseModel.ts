import * as Yup from "yup";

const EXCLUDED_PROPERTIES = ["validations"];

export interface BaseModelInterface {
  validations?: any;
  errors?: any;
}

export default class BaseModel implements BaseModelInterface {
  validations: any = {};
  errors?: any;

  constructor(props: BaseModelInterface) {
    this.fill(props);
  }

  get isValid(): boolean {
    return !this.errors;
  }

  async validate(): Promise<boolean> {
    try {
      this.errors = undefined;
      await Yup.object(this.validations).validate(this, { abortEarly: false });
      return true;
    } catch (error) {
      if(error instanceof Yup.ValidationError) {
        this.errors = error.errors;
      } else {
        throw error;
      }

      return false;
    }
  }

  fill(props: BaseModelInterface): BaseModel {
    for(const key in props) {
      if(EXCLUDED_PROPERTIES.includes(key)) {
        continue;
      }

      if(this.hasOwnProperty(key)) {
        if(this[key] instanceof BaseModel) {
          this[key].fill(props[key]);
        } else {
          this[key] = props[key];
        }
      }
    }

    return this;
  }
}
