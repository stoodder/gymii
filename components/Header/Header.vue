<template>
	<header class="flex items-stretch justify-start h-20 bg-emerald-700 w-full sticky top-0">
		<Logo class="flex items-center justify-center" />
		<nav v-if="!sessionStore.isLoggedIn" class="flex-1 flex items-stretch justify-start">
			<HeaderNavItem to="/sign-up">
				Register
			</HeaderNavItem>
			<HeaderNavItem to="/login">
				Login
			</HeaderNavItem>
		</nav>
		<nav v-else class="flex flex-1 items-stretch justify-start">
			<HeaderNavItem to="/">
				Dashboard
			</HeaderNavItem>
			<HeaderNavItem to="/weight">
				Weight
			</HeaderNavItem>
			<HeaderNavItem to="/training">
				Training
			</HeaderNavItem>
			<div class="flex flex-1 items-center justify-end pr-6">
				<UserMenu />
			</div>
		</nav>
	</header>
</template>

<script lang="ts" setup>
import { useSessionStore } from '@/store';

const sessionStore = useSessionStore();
</script>
