<template>
	<PageCentered>
		<PageTitle>
			Settings
		</PageTitle>
		<Pane>
			<FormVertical @submit.prevent="save">
				<NoticeError v-if="error?.message">
					{{ error.message }}
				</NoticeError>
				<Input
					v-model="user.username"
					label="Username"
					placeholder="Username"
					prefix="@"
					:disabled="isSaving"
					:error="error?.getError('username')"
				/>
				<Input
					v-model="user.name"
					label="Name"
					placeholder="Name"
					:disabled="isSaving"
					:error="error?.getError('name')"
				/>
				<Input
					v-model="user.email"
					type="email"
					label="Email"
					placeholder="Email"
					:disabled="isSaving"
					:error="error?.getError('email')"
				/>
				<FormActions>
					<Button :disabled="isSaving">
						Save
					</Button>
				</FormActions>
			</FormVertical>
		</Pane>
	</PageCentered>
</template>

<script lang="ts" setup>
import { ResponseError } from '@/contracts/errors';
import { useSessionStore } from "@/store";
import { User } from '~~/models';

definePageMeta({
	middleware: ['auth'],
});

const sessionStore = useSessionStore();

const error = ref<ResponseError>();
const isSaving = ref<boolean>(false);
const user = new User(sessionStore.currentUser).reactive();

const save = async () => {
	if(isSaving.value) return;

	try {
		isSaving.value = true;

		await user.toRequest().put();
		
		sessionStore.updateCurrentUser(user);

		error.value = undefined;
	} catch (e) {
		error.value = e;
	} finally {
		isSaving.value = false;
	}
};
</script>
