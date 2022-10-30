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
		<button type="submit" :disabled="isRegistering">Register</button>
		<nuxt-link to="/login">login</nuxt-link>
	</form>
</template>

<script lang="ts" setup>
import type { ResponseError } from "@/errors";
import { SessionService, UserService } from "@/services";

const error = ref<ResponseError | null>(null);
const isRegistering = ref<boolean>(false);
const email = ref<string>('');
const name = ref<string>('');
const password = ref<string>('');

const handleRegister = async () => {
	if (isRegistering.value) return;

	isRegistering.value = true;

	try {
		const user = await UserService.create({
			email: email.value,
			name: name.value,
			password: password.value
		});

		const session = await SessionService.create({
			email: email.value,
			password: password.value
		});
	} catch (e) {
		error.value = e as ResponseError;
	} finally {
		isRegistering.value = false;
	}

	
}
</script>
