<script>
	export let data;
</script>

<svelte:head>
	<title>{data.title}</title>
	<meta name="description" content="Modern project management platform built with SvelteKit" />
	<meta name="keywords" content="project management, kanban, collaboration, productivity" />
</svelte:head>

<main>
	<slot />
</main>

<style>
	main {
		min-height: 100vh;
		background-color: var(--bg-secondary);
	}
</style>