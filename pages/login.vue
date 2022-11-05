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
					:error="error?.getError('username')"
					v-model="username"
				/>
				<Input
					label="Password"
					type="password"
					placeholder="Password"
					:error="error?.getError('password')"
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
import { SessionRequest } from '@/contracts';
import { ResponseError } from "@/contracts/errors";
import { useSessionStore } from "@/store";

const sessionStore = useSessionStore();
const error = ref<ResponseError>();
const username = ref<string>('');
const password = ref<string>('');

const login = async () => {
	if(sessionStore.isLoggingIn) return;
	
	try {
		const request = new SessionRequest({
			username: username.value,
			password: password.value
		});
		
		await sessionStore.login(request);

		username.value = "";
		password.value = "";
		error.value = undefined;

		navigateTo("/");
	} catch(e) {
		error.value = e
	}
};
</script>
