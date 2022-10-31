<template>
	<nav class="w-full z-0 overflow-hidden bg-emerald-900 flex flex-col items-stretch border-b-4 border-b-emerald-600">
		<UserMenuItem @click="logout">
			<md-power-icon class="mr-3 text-xl" />
			Logout
		</UserMenuItem>
	</nav>
</template>

<script lang="ts" setup>
import { useSessionStore } from '~~/store';

const sessionStore = useSessionStore();

const logout = async () => {
	await sessionStore.logout();

	navigateTo("/");
};
</script>
