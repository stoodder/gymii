<template>
	<GymiiLink :to="to" @click="e => emit('click', e)" :class="`
		flex items-center justify-start p-3
		bg-emerald-900 hover:bg-emerald-800
		text-s font-semibold text-stone-200 hover:text-stone-100
		transition-colors duration-75
	`">
		<slot />
	</GymiiLink>
</template>

<script lang="ts" setup>
import { RouteLocationRaw } from 'vue-router';

defineProps<{
	to?: RouteLocationRaw,
}>();

const emit = defineEmits<{
	(e: 'click', ...args: any[]): void
}>();

</script>
