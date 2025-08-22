<script lang="ts">
	import { stopPropagation } from 'svelte/legacy';

	import { createEventDispatcher } from 'svelte';
	import RelativeTime from '../relative-time/RelativeTime.svelte';
	import Score from '../score/Score.svelte';
	import { formatCount } from '$lib/logic/format-count';

	const dispatch = createEventDispatcher();

	interface Props {
		post: kurosearch.Post;
		active: string | undefined;
		links: number;
	}

	let { post, active, links }: Props = $props();
</script>

<div class="summary">
	<RelativeTime value={post.change} />
	<span>•</span>
	<Score value={post.score} />
	<span class="divider"></span>
	<button
		type="button"
		class="codicon codicon-link"
		class:active={active === 'links'}
		onclick={stopPropagation(() => dispatch('links'))}
	>
		{formatCount(links)}
	</button>
	{#if post.comment_count}
		<button
			type="button"
			class="codicon codicon-comment"
			class:active={active === 'comments'}
			onclick={stopPropagation(() => dispatch('comments'))}
		>
			{formatCount(post.comment_count)}
		</button>
	{/if}
	<button
		type="button"
		class="codicon codicon-tag"
		class:active={active === 'tags'}
		onclick={stopPropagation(() => dispatch('tags'))}
	>
		{formatCount(post.tags.length)}
	</button>
</div>

<style lang="scss">
	.summary {
		display: flex;
		align-items: center;
		overflow-x: auto;
		gap: var(--small-gap);
		background-color: var(--background-1);
	}

	span.divider {
		flex-grow: 1;
	}

	button {
		white-space: nowrap;
		display: inline-flex;
		gap: var(--tiny-gap);
		align-items: center;
		background-color: var(--background-2);
		padding: var(--small-gap);
		border-radius: var(--border-radius);
	}

	button.active {
		background-color: var(--background-3);
	}

	button::before {
		font-size: 16px;
	}
</style>
