<template>
	<Pane>
		<FormVertical @submit.prevent="save">
			<NoticeError v-if="error?.message">
				{{ error.message }}
			</NoticeError>
			<Input
				v-model="password"
				type="password"
				label="Current Password"
				placeholder="Password"
				:disabled="isSaving"
				:error="error?.getError('password')"
			/>
			<Input
				v-model="newPassword"
				type="password"
				label="New Password"
				placeholder="New password"
				:disabled="isSaving"
				:error="error?.getError('newPassword')"
			/>
			<Input
				v-model="retypePassword"
				type="password"
				label="Retype new Password"
				placeholder="Retype password"
				:disabled="isSaving"
				:error="error?.getError('retypePassword')"
			/>
			<FormActions>
				<Button :disabled="isSaving">
					Save
				</Button>
			</FormActions>
		</FormVertical>
	</Pane>
</template>

<script lang="ts" setup>
import { ResponseError } from '@/contracts/errors';
import { ChangePasswordRequest } from '~~/contracts';

definePageMeta({
	middleware: ['auth'],
});

const error = ref<ResponseError>();
const isSaving = ref<boolean>(false);
const password = ref<string>();
const newPassword = ref<string>();
const retypePassword = ref<string>();

const save = async () => {
	if(isSaving.value) return;

	try {
		isSaving.value = true;

		const request = new ChangePasswordRequest({
			password: password.value,
			newPassword: newPassword.value,
			retypePassword: retypePassword.value,
		});

		await request.post();

		password.value = undefined;
		newPassword.value = undefined;
		retypePassword.value = undefined;
		error.value = undefined;
	} catch (e) {
		error.value = e;
	} finally {
		isSaving.value = false;
	}
};
</script>
