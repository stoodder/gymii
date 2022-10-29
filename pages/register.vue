<template>
	<form @submit.prevent="register">
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
		<button type="submit" :disabled="isRegistering">Register</button>
		<nuxt-link to="/login">login</nuxt-link>
	</form>
</template>

<script lang="ts" setup>
import { Ref } from 'vue';
import type { ErrorResponseBody } from "@/contracts/responses";
import { SessionService, UserService } from "@/services";

const error: Ref<ErrorResponseBody | null> = ref(null);
const isRegistering: Ref<boolean> = ref(false);
const email: Ref<string> = ref('');
const name: Ref<string> = ref('');
const password: Ref<string> = ref('');

const register = async () => {
	if (isRegistering.value) return;

	isRegistering.value = true;

	try {
		const user = await UserService.create({
			email: email.value,
			name: name.value,
			password: password.value
		});
	} catch (e) {
		error.value = e as ErrorResponseBody;
		isRegistering.value = false;

		return;
	}

	try {
		const session = await SessionService.create({
			email: email.value,
			password: password.value
		});

		console.dir(session);
	} catch (e) {
		error.value = e as ErrorResponseBody;
	} finally {
		isRegistering.value = false;
	}
}
</script>
