<template>
	<form @submit.prevent="login">
		<header>Login</header>
		<div v-if="error?.message">
			{{ error.message }}
		</div>
		<label>
			Email
			<input type="text" placeholder="Username" v-model="email" />
			<div v-if="error?.errors?.email">
				{{ error.errors.email }}
			</div>
		</label>
		<label>
			Password
			<input type="password" placeholder="Password" v-model="password" />
			<div v-if="error?.errors?.password">
				{{ error.errors.password }}
			</div>
		</label>
		<button type="submit" :disabled="sessionStore.isLoggingIn">Login</button>
		<nuxt-link to="/register">Register</nuxt-link>
	</form>
</template>

<script lang="ts" setup>
import { ResponseError } from "@/errors";
import { useSessionStore } from "~~/store";

const sessionStore = useSessionStore();
const error = ref<ResponseError>();
const email = ref<string>('');
const password = ref<string>('');

const login = async () => {
	if(sessionStore.isLoggingIn) return;
	
	try {
		await sessionStore.login({
			email: email.value,
			password: password.value
		});

		email.value = "";
		password.value = "";
		error.value = undefined;
	} catch(e) {
		error.value = e
	}
};
</script>
