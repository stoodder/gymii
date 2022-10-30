<template>
	<Head>
		<title>Gymii</title>
	</Head>
	<Body class="bg-stone-200 min-h-full overflow-hidden">
		<main class="absolute top-0 left-0 right-0 bottom-0 overflow-auto flex flex-col items-center">
			<Header />
			<RouterView />
		</main>
	</Body>
</template>
