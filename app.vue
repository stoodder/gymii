<template>
	<main>
		<Header />
		<RouterView />
	</main>
</template>

<script type="ts" setup>
import 'vue-ionicons/ionicons.css';
import './assets/css/tailwind.css';
import { useSessionStore } from '@/store';

const sessionStore = useSessionStore();

await useAsyncData('restoreSession', sessionStore.restoreSession)
</script>
