<script lang="ts">
	import { createBubbler, preventDefault } from 'svelte/legacy';

	const bubble = createBubbler();
	import { formatTagname } from '$lib/logic/format-tag';
	import { MODIFIER_NAMES } from '$lib/logic/tag-modifier-data';

	interface Props {
		tag: kurosearch.SearchableTag;
	}

	let { tag }: Props = $props();
</script>

<button
	type="button"
	class={MODIFIER_NAMES[tag.modifier]}
	onclick={bubble('click')}
	oncontextmenu={preventDefault(bubble('contextmenu'))}
>
	{formatTagname(tag.name)}
</button>

<style lang="scss">
	button {
		display: inline-flex;
		align-items: center;
		gap: var(--tiny-gap);
		background-color: var(--background-2);
		color: var(--text-accent);
		height: var(--line-height-small);
		border-radius: var(--line-height-small);
		font-size: var(--text-size-small);
		padding-left: 12px;
		padding-right: 12px;
		user-select: none;
	}

	.exclude {
		text-decoration: line-through;
	}

	.optional {
		font-style: italic;
	}

	@media (hover: hover) {
		button {
			transition: background-color var(--default-transition-behaviour);
		}

		button:hover {
			background-color: var(--background-3);
		}
	}
</style>
