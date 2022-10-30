<template>
	<NuxtLink v-if="to" :to="to" class="flex items-center justify-center px-2">
		<slot />
	</NuxtLink>
	<a v-else href="#" @click="emit('click')" class="flex items-center justify-center px-2">
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
