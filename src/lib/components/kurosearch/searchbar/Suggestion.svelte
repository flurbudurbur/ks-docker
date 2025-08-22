<script lang="ts">
	import { formatCount } from '$lib/logic/format-count';
	import { formatTagname } from '$lib/logic/format-tag';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let suggestion: kurosearch.Suggestion;
	export let selected = false;
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<button
	role="button"
	tabindex="0"
	on:click={() => dispatch('click', suggestion)}
	title={suggestion.label}
	class:selected
>
	<i class={suggestion.type === 'supertag' ? 'codicon codicon-star-full' : 'codicon codicon-tag'} ></i>
	<span class="tag-name">{formatTagname(suggestion.label)}</span>
	<span class="tag-count">{formatCount(suggestion.count)}</span>
</button>

<style>
	button {
		display: grid;
		align-items: center;
		height: var(--line-height-small);
		grid-template-columns: 32px 1fr auto;
		gap: 8px;
		font-size: var(--text-size);
		padding-inline: 6px;
		user-select: none;
	}

	button:focus,
	.selected {
		background-color: var(--background-2);
		outline: none;
	}

	.tag-name {
		grid-column: 2;
		white-space: nowrap;
		overflow: hidden;
	}

	@media (hover: hover) {
		button {
			transition: background-color var(--default-transition-behaviour);
		}

		button:hover {
			background-color: var(--background-2);
		}
	}
</style>
