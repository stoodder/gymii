import BaseModel, { BaseModelInterface } from './BaseModel';

export interface UserInterface extends BaseModelInterface {
  email?: string;
  firstName?: string;
  lastName?: string;
}

export default class User extends BaseModel implements UserInterface {
  email?: string;
  firstName?: string;
  lastName?: string;

  constructor(props: UserInterface) {
    super(props);
  }
}
