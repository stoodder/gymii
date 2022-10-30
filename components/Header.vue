<template>
	<header class="flex items-stretch justify-start h-16 px-4 shadow-md">
		<Logo class="flex items-center justify-center" />
		<nav v-if="!sessionStore.isLoggedIn" class="flex-1 flex items-stretch justify-end">
			<HeaderNavItem to="/register">
				Register
			</HeaderNavItem>
			<HeaderNavItem to="/login">
				Login
			</HeaderNavItem>
		</nav>
		<nav v-else class="flex-1 flex items-stretch justify-end">
			<UserMenu />
		</nav>
	</header>
</template>

<script lang="ts" setup>
import { useSessionStore } from '@/store';

const sessionStore = useSessionStore();
</script>
