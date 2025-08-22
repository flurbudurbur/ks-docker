<script lang="ts">
	import { createBubbler } from 'svelte/legacy';

	const bubble = createBubbler();
	import { onpopstate } from '$lib/logic/use/onpopstate';
	import { onMount } from 'svelte';

	interface Props {
		dialog: HTMLDialogElement;
		children?: import('svelte').Snippet;
	}

	let { dialog = $bindable(), children }: Props = $props();

	const onPopState = () => {
		dialog.close();
	};

	onMount(() => {
		// Close on backdrop click
		dialog.addEventListener('click', (event) => {
			const rect = dialog.getBoundingClientRect();
			const isInDialog =
				rect.top <= event.clientY &&
				event.clientY <= rect.top + rect.height &&
				rect.left <= event.clientX &&
				event.clientX <= rect.left + rect.width;
			if (event.target === dialog && !isInDialog) {
				dialog?.close();
			}
		});
	});
</script>

<dialog bind:this={dialog} onclose={bubble('close')} use:onpopstate={onPopState}>
	{@render children?.()}
</dialog>

<style lang="scss">
	dialog {
		border-radius: var(--border-radius-large);
		background-color: var(--background-0);
		z-index: var(--z-dialog);
		padding: var(--grid-gap);
		max-width: calc(100vw - 2 * var(--grid-gap));
		max-height: calc(100vh - 2 * var(--grid-gap));
		overflow-y: auto;
	}

	dialog::backdrop {
		position: fixed;
		top: 0;
		left: 0;
		display: grid;
		place-items: center;
		contain: strict;
		height: 100vh;
		width: 100vw;
		background-color: #2228;
		backdrop-filter: blur(10px);
		z-index: var(--z-dialog);
	}
</style>
