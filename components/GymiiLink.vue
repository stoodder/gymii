<template>
	<NuxtLink v-if="to" :to="to" @click="e => emit('click', e)">
		<slot />
	</NuxtLink>
	<a v-else href="#" @click="e => emit('click', e)">
		<slot />
	</a>
</template>

<script lang="ts" setup>
import { RouteLocationRaw } from 'vue-router';

const props = defineProps<{
	to?: RouteLocationRaw,
}>();

const emit = defineEmits<{
	(e: 'click', ...args: any[]): void
}>();
</script>
