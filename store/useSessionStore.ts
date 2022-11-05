import { defineStore } from 'pinia';
import { Session, User } from '@/models';
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
	currentUser: (state: State) => User | undefined;
}

type Actions = {
	login: (payload: SessionRequest) => Promise<void>;
	register: (payload: UserRequest) => Promise<void>;
	restoreSession: () => Promise<void>;
	logout: () => Promise<void>;
	updateCurrentUser: (user: User) => void;
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
		currentUser(state: State): User | undefined {
			return state.session?.user
		}
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

				const response = await request.post();
				
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
		updateCurrentUser(user: User) {
			if(!this.isLoggedIn) return;

			this.session!.user = user;
		}
  },
});
