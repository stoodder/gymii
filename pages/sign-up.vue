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
					:error="error?.getError('username')"
					v-model="username"
				/>
				<Input
					label="Email"
					type="email"
					placeholder="Email address"
					:error="error?.getError('email')"
					v-model="email"
				/>
				<Input
					label="Name"
					type="name"
					placeholder="Full name"
					:error="error?.getError('name')"
					v-model="name"
				/>
				<Input
					label="Password"
					type="password"
					placeholder="Password"
					:error="error?.getError('password')"
					v-model="password"
				/>
				<Input
					label="Retype password"
					type="password"
					placeholder="Password"
					:error="error?.getError('retypePassword')"
					v-model="retypePassword"
				/>
				<FormActions>
					<Button type="submit" :disabled="sessionStore.isRegistering" class="mr-6">
						Sign Up
					</Button>
					<BodyLink to="/login" class="text-md">
						Login
					</BodyLink>
				</FormActions>
			</FormVertical>
		</Pane>
	</PageCentered>
</template>

<script lang="ts" setup>
import type { ResponseError } from "@/contracts/errors";
import { useSessionStore } from "@/store";
import { UserRequest } from "@/contracts";

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
		const request = new UserRequest({
			email: email.value,
			username: username.value,
			name: name.value,
			password: password.value,
			retypePassword: retypePassword.value,
		});

		await sessionStore.register(request);

		email.value = "";
		username.value = "";
		name.value = "";
		password.value = "";
		retypePassword.value = "";
		error.value = undefined;

		navigateTo("/"); // TODO: Navigate to welcome screen
	} catch (e) {
		error.value = e;
	}
}
</script>
