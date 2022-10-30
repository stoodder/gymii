<template>
	<PageCentered>
		<PageTitle>
			Sign Up
		</PageTitle>
		<Pane>
			<FormVertical @submit.prevent="register">
				<NoticeError v-if="error?.message">
					{{ error.message }}
				</NoticeError>
				<Input
					label="Username"
					type="text"
					placeholder="Username"
					prefix="@"
					:error="error?.errors?.username"
					v-model="username"
				/>
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
				<Input
					label="Retype password"
					type="password"
					placeholder="Password"
					:error="error?.errors?.retypePassword"
					v-model="retypePassword"
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
const username = ref<string>('');
const name = ref<string>('');
const password = ref<string>('');
const retypePassword = ref<string>('');

const register = async () => {
	if(sessionStore.isRegistering) return;

	try {
		await sessionStore.register({
			email: email.value,
			username: username.value,
			name: name.value,
			password: password.value,
			retypePassword: retypePassword.value
		});

		email.value = "";
		username.value = "";
		name.value = "";
		password.value = "";
		retypePassword.value = "";
		error.value = undefined;
	} catch (e) {
		error.value = e;
	}
}
</script>
