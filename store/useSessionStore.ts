import { defineStore } from 'pinia';
import { Session } from '@/models';
import { SessionService, UserService } from '@/services';
import { SessionRequest, UserRequest } from '@/contracts';

type State = {
  session?: Session;
	isLoggingIn: boolean;
	isLoggingOut: boolean;
	isRegistering: boolean;
};

type Getters = {
	isTakingAction: (state: State) => boolean;
	isLoggedIn: (state: State) => boolean;
}

type This = State & Getters;

export default defineStore('SessionStore', {
  state: (): State => ({
    session: undefined,
		isLoggingIn: false,
		isLoggingOut: false,
		isRegistering: false,
  }),
  getters: {
		isTakingAction(state: State): boolean {
			return state.isLoggingIn || state.isLoggingOut || state.isRegistering;
		},
    isLoggedIn(state: State): boolean {
      return !!state.session;
    },
  } as Getters,
  actions: {
    async login(this: This, sessionRequest: SessionRequest) {
			if(this.isTakingAction) return;

			try {
				this.isLoggingIn = true;

				this.session = await SessionService.login(sessionRequest);
			} finally {
				this.isLoggingIn = false;
			}
    },
		async register(this: This, userRequest: UserRequest) {
			if(this.isTakingAction) return;

			try {
				this.isRegistering = true;

				const user = await UserService.register(userRequest);
				
				this.session = new Session({user});
			} finally {
				this.isRegistering = false;
			}
		},
		async restoreSession(this: This) {
			if(this.isTakingAction) return;
			if(this.isLoggedIn) return;

			try {
				this.session = await SessionService.restoreSession();
			} catch (error) {
				console.log(error);
			}
		},
    async logout(this: This) {
			if(this.isTakingAction) return;
			if(!this.isLoggedIn) return;

			await SessionService.logout();

      this.session = undefined;
    },
  },
});
