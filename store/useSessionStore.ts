import { defineStore } from 'pinia';
import { Session } from '@/models';
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

type Actions = {
	login: (payload: SessionRequest) => Promise<void>;
	register: (payload: UserRequest) => Promise<void>;
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
    async login(request: SessionRequest) {
			if(this.isTakingAction) return;

			try {
				this.isLoggingIn = true;

				const response = await request.post();

				this.session = response.toModel();
			} finally {
				this.isLoggingIn = false;
			}
    },
		async register(request: UserRequest) {
			if(this.isTakingAction) return;

			try {
				this.isRegistering = true;

				const response = await request.create();
				
				this.session = new Session({
					user: response.toModel()
				});
			} finally {
				this.isRegistering = false;
			}
		},
		async restoreSession() {
			if(this.isTakingAction) return;
			if(this.isLoggedIn) return;

			try {
				const response = await new SessionRequest().get();

				this.session = response.toModel();
			} catch (error) {
				console.log(error);
			}
		},
    async logout() {
			if(this.isTakingAction) return;
			if(!this.isLoggedIn) return;

			await new SessionRequest().delete();

			this.session = undefined;
    },
  },
});
