<template>
	<GymiiLink :to="to" :class="`
		flex items-center justify-center px-6
		text-stone-200 text-md font-semibold hover:bg-emerald-600
		transition-colors duration-75
	`">
		<slot />
	</GymiiLink>
</template>

<script lang="ts" setup>
import { RouteLocationRaw } from 'vue-router';

const props = defineProps<{
	to?: RouteLocationRaw
}>();
</script>

<style lang="postcss" scoped>
.router-link-active {
	@apply bg-emerald-600 text-white;
}
</style>
