<template>
	<PageCentered>
		<PageTitle>
			Login
		</PageTitle>
		<Pane>
			<FormVertical @submit.prevent="login">
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
					label="Password"
					type="password"
					placeholder="Password"
					:error="error?.errors?.password"
					v-model="password"
				>
					<template #links>
						<BodyLink to="/">
							Forgot password?
						</BodyLink>
					</template>
				</Input>
				<FormActions>
					<BodyLink to="/sign-up" class="text-md">
						Sign Up
					</BodyLink>
					<Button type="submit" :disabled="sessionStore.isLoggingIn">
						Login
					</Button>
				</FormActions>
			</FormVertical>
		</Pane>
	</PageCentered>
</template>

<script lang="ts" setup>
import { ResponseError } from "@/errors";
import { useSessionStore } from "@/store";

const sessionStore = useSessionStore();
const error = ref<ResponseError>();
const username = ref<string>('');
const password = ref<string>('');

const login = async () => {
	if(sessionStore.isLoggingIn) return;
	
	try {
		await sessionStore.login({
			username: username.value,
			password: password.value
		});

		username.value = "";
		password.value = "";
		error.value = undefined;
	} catch(e) {
		error.value = e
	}
};
</script>
