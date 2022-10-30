<template>
	<header class="flex items-stretch justify-start h-20 bg-emerald-700 sticky w-full">
		<Logo class="flex items-center justify-center" />
		<nav v-if="!sessionStore.isLoggedIn" class="flex-1 flex items-stretch justify-start">
			<HeaderNavItem to="/register">
				Register
			</HeaderNavItem>
			<HeaderNavItem to="/login">
				Login
			</HeaderNavItem>
		</nav>
		<nav v-else class="flex flex-1 items-stretch justify-start">
			<HeaderNavItem to="/login">
				Weight
			</HeaderNavItem>
			<HeaderNavItem to="/login">
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
