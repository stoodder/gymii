<template>
	<GymiiLink :to="to" class="hover:underline text-stone-700 font-semibold">
		<slot />
	</GymiiLink>
</template>

<script lang="ts" setup>
import { RouteLocationRaw } from 'vue-router';

const props = defineProps<{
	to?: RouteLocationRaw
}>();
</script>
