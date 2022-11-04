<template>
	<nav class="w-full z-0 overflow-hidden bg-emerald-900 flex flex-col items-stretch border-b-4 border-b-emerald-600 rounded-b-sm">
		<UserMenuItem @click="logout">
			<Icon class="mr-3 text-xl" name="ion:md-power" />
			Logout
		</UserMenuItem>
	</nav>
</template>

<script lang="ts" setup>
import { useSessionStore } from '@/store';

const sessionStore = useSessionStore();

const logout = async () => {
	await sessionStore.logout();

	navigateTo("/");
};
</script>
