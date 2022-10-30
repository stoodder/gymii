<template>
	<form @submit="e => $emit('submit', e)" class="flex flex-col items-stetch w-full">
		<slot />
	</form>
</template>
