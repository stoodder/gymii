<template>
	<NuxtLink v-if="to" :to="to" :class="`
		flex items-center justify-start p-3
		bg-emerald-900 hover:bg-emerald-800
		text-s font-semibold text-stone-200 hover:text-stone-100
		transition-colors duration-75
	`">
		<slot />
	</NuxtLink>
	<a v-else href="#" @click.prevent="emit('click')" :class="`
		flex items-center justify-start p-3
		bg-emerald-900 hover:bg-emerald-800
		text-s font-semibold text-stone-200 hover:text-stone-100
		transition-colors duration-75
	`">
		<slot />
	</a>
</template>

<script lang="ts" setup>
import { RouteLocationRaw } from 'vue-router';

const props = defineProps<{
	to?: RouteLocationRaw
}>();

const emit = defineEmits<{
	(e: 'click', ...args: any[]): void
}>();
</script>
