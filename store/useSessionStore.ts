import { defineStore } from 'pinia';
import { Session } from '@/models';
import { SessionService, UserService } from '@/services';
import { SessionRequest, CreateUserRequest } from '@/contracts';

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

type Actions = {
	login: (payload: SessionRequest) => Promise<void>;
	register: (payload: CreateUserRequest) => Promise<void>;
	restoreSession: () => Promise<void>;
	logout: () => Promise<void>;
}

export default defineStore<'SessionStore', State, Getters, Actions>('SessionStore', {
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
    async login(sessionRequest: SessionRequest) {
			if(this.isTakingAction) return;

			try {
				this.isLoggingIn = true;

				this.session = await SessionService.login(sessionRequest);
			} finally {
				this.isLoggingIn = false;
			}
    },
		async register(userRequest: CreateUserRequest) {
			if(this.isTakingAction) return;

			try {
				this.isRegistering = true;

				const user = await UserService.register(userRequest);
				
				this.session = new Session({user});
			} finally {
				this.isRegistering = false;
			}
		},
		async restoreSession() {
			if(this.isTakingAction) return;
			if(this.isLoggedIn) return;

			try {
				this.session = await SessionService.restoreSession();
			} catch (error) {
				console.log(error);
			}
		},
    async logout() {
			if(this.isTakingAction) return;
			if(!this.isLoggedIn) return;

			await SessionService.logout();

      this.session = undefined;
    },
  },
});
