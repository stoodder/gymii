<template>
	<NuxtLink :to="to" class="flex items-center justify-center px-6 text-white text-md font-semibold hover:bg-emerald-600">
		<slot />
	</NuxtLink>
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

<style lang="scss" scoped>
.router-link-active {
	@apply bg-emerald-600;
}
</style>
