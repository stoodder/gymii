<template>
	<button
		:type="type"
		:disabled="disabled"
		:class="`
			py-3 px-6
			bg-emerald-800 hover:bg-emerald-700
			text-stone-100 hover:text-white text-md font-bold
			transition-colors duration-75
			rounded-sm
	`">
		<slot />
	</button>
</template>

<script lang="ts" setup>
const props = defineProps<{
	type?: 'button' | 'submit' | 'reset',
	disabled?: boolean,
}>();
</script>
