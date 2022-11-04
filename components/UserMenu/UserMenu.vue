<template>
	<div 
		ref="rootElement"
		@click.prevent="toggleNavIsVisible"
		:class="`
			flex items-center justify-center relative w-48
			p-3 text-sm cursor-pointer text-stone-200 text-mg font-semibold
			transition-colors duration-75
			${navIsVisible ? `
				bg-emerald-900 rounded-t-sm
			` : `
				hover:bg-emerald-900 bg-emerald-800 hover:text-stone-100 rounded-sm
			`}
		`">
		<Icon class="mr-3 text-xl" name="ion:md-menu" />
		<div class="flex flex-1 items-center justify-start">
			{{ sessionStore.session.user?.name }}
		</div>
		<UserMenuNav v-if="navIsVisible" class="absolute top-full left-0" />
	</div>
</template>

<script lang="ts" setup>
import { useSessionStore } from '@/store';

const sessionStore = useSessionStore();

const navIsVisible = ref<boolean>(false);
const rootElement = ref<HTMLElement | null>(null);

const toggleNavIsVisible = () => {
	navIsVisible.value = !navIsVisible.value;
};

function handleWindowClick(e: MouseEvent) {
	if (!rootElement.value.contains(e.target as HTMLElement)) {
		navIsVisible.value = false;
	}
}

onMounted(() => {
	window.addEventListener('click', handleWindowClick)
});

onUnmounted(() => {
	window.removeEventListener('click', handleWindowClick)
});
</script>
