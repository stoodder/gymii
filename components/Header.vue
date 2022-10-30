<template>
    <header>
			<div>
				Gymii
			</div>
				<ul v-if="!sessionStore.isLoggedIn">
					<li>
						<nuxt-link to="/">Home</nuxt-link>
					</li>
					<li>
						<nuxt-link to="/register">Register</nuxt-link>
					</li>
					<li>
						<nuxt-link to="/login">Login</nuxt-link>
					</li>
				</ul>
				<ul v-else>
					<li>
						<nuxt-link to="/">Home</nuxt-link>
					</li>
					<li>
						<a href="#" @click.prevent="sessionStore.logout">
							Logout
						</a>
					</li>
				</ul>
		</header>
</template>

<script lang="ts" setup>
import { useSessionStore } from '@/store';

const sessionStore = useSessionStore();
</script>
