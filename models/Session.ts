import BaseModel, { BaseModelInterface } from './BaseModel';
import type User from "./User";

export interface SessionInterface extends BaseModelInterface {
  user?: User;
}

export default class Session extends BaseModel implements SessionInterface {
  user?: User;

  constructor(props: SessionInterface) {
    super(props);
  }

  isLoggedIn() {
    return !!this.user;
  }
}
