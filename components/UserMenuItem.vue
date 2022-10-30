<template>
	<NuxtLink v-if="to" :to="to" class="flex items-center justify-start text-s p-3 font-semibold">
		<slot />
	</NuxtLink>
	<a v-else href="#" @click.prevent="emit('click')" class="flex items-center justify-start text-s p-3 font-semibold">
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
