<template>
	<nav class="w-full shadow-mdrounded-b-md rounded-tl-md bg-gray-100 border border-gray-300 z-0 overflow-hidden">
		<div class="bg-white flex flex-col items-stretch m-1 hover:underline">
			<UserMenuItem @click="sessionStore.logout">
				<md-power-icon class="mr-2 text-gray-500 text-sm" />
				Logout
			</UserMenuItem>
		</div>
	</nav>
</template>

<script lang="ts" setup>
import { useSessionStore } from '~~/store';

const sessionStore = useSessionStore();
</script>
