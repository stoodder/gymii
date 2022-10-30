<template>
	<div class="flex items-center justify-center relative w-48" ref="rootElement">
		<div 
			@click.prevent="toggleNavIsVisible"
			:class="`
				bg-gray-100 rounded-md py-2 px-3 text-sm w-full cursor-pointer border-gray-300 border z-10 relative
				flex items-center
				${navIsVisible ? 'border-b-transparent rounded-b-none' : ''}
				${navIsVisible ? '' : 'hover:bg-gray-200'}
			`">
			<md-menu-icon class="mr-2" />
			{{ sessionStore.session.user?.name }}
		</div>
		<UserMenuNav v-if="navIsVisible" class="absolute top-full right-0 -mt-4 shadow-md" />
	</div>
</template>

<script lang="ts" setup>
import { useSessionStore } from '~~/store';

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
