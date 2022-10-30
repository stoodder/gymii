<template>
	<label class="flex flex-col items-stretch justify-start mb-6">
		<span v-if="label" class="block text-sm font-semibold mb-1">
			{{label}}
		</span>
		<input
			:class="`
				outline-none p-3 font-lg font-bold placeholder:text-stone-400 text-stone-700
				${isFocussed ? 'bg-white' : 'bg-stone-100'}
			`"
			:type="type || 'text'"
			:placeholder="placeholder"
			:value="modelValue"
			@focus="isFocussed = true"
			@blur="isFocussed = false"
			@input="onInput"
		/>
		<div v-if="error" class=" bg-rose-800 text-stone-200 px-3 py-2 text-sm font-semibold">
			{{ error }}
		</div>
		<div v-if="slots.links" class="text-xs font-semibold flex items-center justify-end mt-3">
			<slot name="links" />
		</div>
	</label>
</template>

<script lang="ts" setup>
const slots = useSlots();
const isFocussed = ref<boolean>(false);

const props = defineProps<{
	label?: string,
	type?: string,
	placeholder?: string,
	modelValue?: string,
	error?: string,
}>();

const emits = defineEmits<{
	(update: string, value: string): void
}>();

const onInput = (e: Event) => {
	emits('update:modelValue', (e.target as HTMLInputElement).value);
};
</script>
