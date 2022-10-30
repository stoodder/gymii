<template>
	<main>
		<Header />
		<RouterView />
	</main>
</template>

<script type="ts" setup>
import { useSessionStore } from '@/store';

const sessionStore = useSessionStore();

await useAsyncData('restoreSession', sessionStore.restoreSession)
</script>
