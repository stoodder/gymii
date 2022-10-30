<template>
	<form @submit.prevent="handleRegister">
		<header>Register</header>
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
			Name
			<input type="text" placeholder="Name" v-model="name" />
			<div v-if="error?.errors?.name">
				{{ error.errors.name }}
			</div>
		</label>
		<label>
			Password
			<input type="password" placeholder="Password" v-model="password" />
			<div v-if="error?.errors?.password">
				{{ error.errors.password }}
			</div>
		</label>
		<button type="submit" :disabled="sessionStore.isRegistering">Register</button>
		<nuxt-link to="/login">login</nuxt-link>
	</form>
</template>

<script lang="ts" setup>
import type { ResponseError } from "@/errors";
import { useSessionStore } from "@/store";

const sessionStore = useSessionStore();
const error = ref<ResponseError>();
const email = ref<string>('');
const name = ref<string>('');
const password = ref<string>('');

const handleRegister = async () => {
	try {
		await sessionStore.register({
			email: email.value,
			name: name.value,
			password: password.value
		});

		email.value = "";
		name.value = "";
		password.value = "";
		error.value = undefined;
	} catch (e) {
		error.value = e;
	}
}
</script>
