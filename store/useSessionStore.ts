import { defineStore } from 'pinia';
import { Session } from '@/models';
import { SessionService, UserService } from '@/services';
import { SessionRequest, UserRequest } from '~~/contracts';

export type State = {
  session?: Session;
	isLoggingIn: boolean;
	isRegistering: boolean;
};

export default defineStore('SessionStore', {
  state: (): State => ({
    session: undefined,
		isLoggingIn: false,
		isRegistering: false,
  }),
  getters: {
    isLoggedIn(state: State): boolean {
      return !!state.session;
    },
  },
  actions: {
    async login(this: State, sessionRequest: SessionRequest) {
			if(this.isLoggingIn || this.isRegistering) return;

			try {
				this.isLoggingIn = true;

				this.session = await SessionService.create(sessionRequest);
			} finally {
				this.isLoggingIn = false;
			}
    },
		async register(this: State, userRequest: UserRequest) {
			if(this.isLoggingIn || this.isRegistering) return;

			try {
				this.isRegistering = true;

				const user = await UserService.create(userRequest);
				
				this.session = await SessionService.create({
					email: user.email,
					password: userRequest.password,
				});
			} finally {
				this.isRegistering = false;
			}
		},
    async logout(this: State) {
			// await SessionService.logout();

      this.session = undefined;
    },
  },
});
