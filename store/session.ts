import { defineStore } from 'pinia';

export type SessionState = {
  user: string;
};

export const useSessionStore = defineStore({
  id: 'session',
  state: (): SessionState => ({
    user: null,
  }),
  getters: {
    isLoggedIn() {
      return !!this.user;
    },
  },
  actions: {
    login(user) {
      this.user = user;
    },
    logout() {
      this.user = null;
    },
  },
});
