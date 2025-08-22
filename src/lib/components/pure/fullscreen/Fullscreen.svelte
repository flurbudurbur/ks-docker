<script lang="ts">
	import { stopPropagation } from 'svelte/legacy';

	import { createEventDispatcher, onDestroy, onMount } from 'svelte';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	const dispatch = createEventDispatcher();
	const close = () => dispatch('close');
	const closeOnEscapePressed = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			close();
		}
	};
	const closeOnFullscreenExit = () => {
		if (!document.fullscreenElement) {
			close();
		}
	};

	let dialog: HTMLDivElement = $state();
	let ready = $state(false);

	onMount(async () => {
		dialog.focus();
		document.addEventListener('fullscreenchange', closeOnFullscreenExit);
		try {
			await dialog.requestFullscreen();
		} catch {
			// ignored
		}
		ready = true;
	});

	onDestroy(async () => {
		document.removeEventListener('fullscreenchange', closeOnFullscreenExit);
		try {
			await document.exitFullscreen();
		} catch {
			// ignored
		}
	});
</script>

<div
	bind:this={dialog}
	role="none"
	tabindex="-1"
	onclick={stopPropagation(() => {})}
	onkeydown={closeOnEscapePressed}
>
	{#if ready}
		{@render children?.()}
	{/if}
</div>

<style lang="scss">
	div {
		position: fixed;
		top: 0;
		left: 0;
		height: 100vh;
		width: 100vw;

		display: grid;
		place-items: center;
		contain: strict;

		background-color: var(--background-0);
		backdrop-filter: blur(5px);
		z-index: var(--z-dialog);
		overflow-y: scroll;
		overscroll-behavior-block: none;
	}

	div:focus {
		outline: unset;
	}

	@media (pointer: fine) {
		div::-webkit-scrollbar {
			width: 0;
			height: 0;
		}

		div {
			scrollbar-width: none;
		}
	}
</style>
