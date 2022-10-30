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
					label="Email"
					type="email"
					placeholder="Email address"
					:error="error?.errors?.email"
					v-model="email"
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
					<BodyLink to="/register" class="text-md">
						Register
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
const email = ref<string>('');
const password = ref<string>('');

const login = async () => {
	if(sessionStore.isLoggingIn) return;
	
	try {
		await sessionStore.login({
			email: email.value,
			password: password.value
		});

		email.value = "";
		password.value = "";
		error.value = undefined;
	} catch(e) {
		error.value = e
	}
};
</script>
