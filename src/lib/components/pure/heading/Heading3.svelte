<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<h3>{@render children?.()}</h3>

<style lang="scss">
	h3 {
		color: var(--text-highlight);
		font-size: var(--text-size-h3);
		padding-block-start: 4rem;
		padding-block-end: var(--grid-gap);
	}
</style>
