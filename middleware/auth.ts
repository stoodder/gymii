import { useSessionStore } from '@/store';

export default defineNuxtRouteMiddleware(async (to, from) => {
	const sessionStore = useSessionStore();

	if(!sessionStore.isLoggedIn) {
		return navigateTo('/login');
	}
})
