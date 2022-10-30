import { defineStore } from 'pinia';
import { Session } from '@/models';
import { SessionService, UserService } from '@/services';
import { SessionRequest, UserRequest } from '@/contracts';

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
		async restoreSession(this: State) {
			try {
				this.session = await SessionService.restoreSession();
			} catch (error) {
				console.log(error);
			}
		},
    async login(this: State, sessionRequest: SessionRequest) {
			if(this.isLoggingIn || this.isRegistering) return;

			try {
				this.isLoggingIn = true;

				this.session = await SessionService.login(sessionRequest);
			} finally {
				this.isLoggingIn = false;
			}
    },
		async register(this: State, userRequest: UserRequest) {
			if(this.isLoggingIn || this.isRegistering) return;

			try {
				this.isRegistering = true;

				const user = await UserService.register(userRequest);
				
				this.session = new Session({user});
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
