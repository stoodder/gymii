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
import { Ref } from 'vue';
import { SessionService } from "@/services";
import { ErrorResponseBody } from "@/contracts/responses";

const error: Ref<ErrorResponseBody | null> = ref(null);
const isLoggingIn: Ref<boolean> = ref(false);
const email: Ref<string> = ref('');
const password: Ref<string> = ref('');

const login = async () => {
	if(isLoggingIn.value) return;

	isLoggingIn.value = true;

	try {
		const session = await SessionService.create({
			email: email.value,
			password: password.value
		});
	} catch(e) {
		error.value = e as ErrorResponseBody
	} finally {
		isLoggingIn.value = false;
	}
};
</script>
