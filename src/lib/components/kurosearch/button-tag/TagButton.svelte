<script lang="ts">
	import { createBubbler } from 'svelte/legacy';

	const bubble = createBubbler();
	interface Props {
		title: string;
		children?: import('svelte').Snippet;
	}

	let { title, children }: Props = $props();
</script>

<button type="button" {title} onclick={bubble('click')}>
	{@render children?.()}
</button>

<style lang="scss">
	button {
		width: var(--line-height-small);
		height: var(--line-height-small);
		border-radius: var(--border-radius);
		padding: var(--tiny-gap);
		background-color: var(--accent);
		color: var(--text-accent);
	}

	@media (hover: hover) {
		button {
			transition: background-color var(--default-transition-behaviour);
		}

		button:hover {
			background-color: var(--accent-light);
		}
	}
</style>
