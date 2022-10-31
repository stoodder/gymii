import { useSessionStore } from '@/store';

export default defineNuxtRouteMiddleware(async (to, from) => {
	if(process.server) {
		const sessionCookie = useCookie('session');

		if(sessionCookie.value) {
			await useSessionStore().restoreSession();
		}
	}
})
