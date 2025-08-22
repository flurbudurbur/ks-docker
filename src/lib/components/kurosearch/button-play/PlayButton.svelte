<script lang="ts">
	import { createBubbler } from 'svelte/legacy';

	const bubble = createBubbler();
	import { base } from '$app/paths';

	const LOAD_SRC = `${base}/assets/load.svg`;
	const PLAY_SRC = `${base}/assets/play.svg`;
	const PAUSE_SRC = `${base}/assets/pause.svg`;

	interface Props {
		playing: boolean;
		loading: boolean;
		[key: string]: any;
	}

	let { ...props }: Props = $props();
</script>

<button type="button" onclick={bubble('click')} class={props.class}>
	{#if props.loading}
		<img src={LOAD_SRC} alt="Loading GIF" width="16" height="32" />
	{:else if props.playing}
		<img src={PAUSE_SRC} alt="Stop GIF" width="16" height="32" />
	{:else}
		<img src={PLAY_SRC} alt="Start GIF" width="16" height="32" style="margin-left: 4px;" />
	{/if}
</button>

<style lang="scss">
	button {
		--size: 48px;

		border-radius: var(--size);
		width: var(--size);
		height: var(--size);
		padding: 8px 6px 6px;

		color: #000;
		background-color: #fff;

		user-select: none;
	}
</style>
