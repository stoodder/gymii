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
		<button type="submit" :disabled="isLoggingIn">Login</button>
		<nuxt-link to="/register">Register</nuxt-link>
	</form>
</template>

<script lang="ts" setup>
import { SessionService } from "@/services";
import { ResponseError } from "@/errors";

const error = ref<ResponseError | null>(null);
const isLoggingIn = ref<boolean>(false);
const email = ref<string>('');
const password = ref<string>('');

const login = async () => {
	if(isLoggingIn.value) return;

	isLoggingIn.value = true;
	
	try {
		const session = await SessionService.create({
			email: email.value,
			password: password.value
		});
	} catch(e) {
		error.value = e as ResponseError
	} finally {
		isLoggingIn.value = false;
	}
};
</script>
