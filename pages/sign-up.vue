<template>
	<PageCentered>
		<PageTitle>
			Register
		</PageTitle>
		<Pane>
			<FormVertical @submit.prevent="handleRegister">
				<NoticeError v-if="error?.message">
					{{ error.message }}
				</NoticeError>
				<Input
					label="Email"
					type="email"
					placeholder="Email address"
					:error="error?.errors?.email"
					v-model="email"
				/>
				<Input
					label="Name"
					type="name"
					placeholder="Full name"
					:error="error?.errors?.name"
					v-model="name"
				/>
				<Input
					label="Password"
					type="password"
					placeholder="Password"
					:error="error?.errors?.password"
					v-model="password"
				/>
				<FormActions>
					<BodyLink to="/login" class="text-md">
						Login
					</BodyLink>
					<Button type="submit" :disabled="sessionStore.isRegistering">
						Sign Up
					</Button>
				</FormActions>
			</FormVertical>
		</Pane>
	</PageCentered>
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
