<template>
	<GymiiLink :to="to" :class="`
		bg-stone-300 hover:bg-stone-400
		px-6 py-3 mx-3
		rounded-sm
		transition-colors duration-75
		inline-block
		font-semibold text-md text-stone-700 hover:text-stone-900
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
.router-link-exact-active {
	@apply bg-emerald-700 hover:bg-emerald-700 text-white hover:text-white cursor-default;
}
</style>
