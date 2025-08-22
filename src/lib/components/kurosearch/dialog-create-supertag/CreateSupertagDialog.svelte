<script lang="ts">
	import type kurosearch from '$lib/types/kurosearch';
	import { createEventDispatcher } from 'svelte';
	import Dialog from '$lib/components/pure/dialog/Dialog.svelte';
	import TextButton from '$lib/components/pure/text-button/TextButton.svelte';
	import DetailedTag from '$lib/components/kurosearch/tag-detailed/DetailedTag.svelte';


	interface Props {
		dialog: HTMLDialogElement;
		name?: string;
		description?: string;
		tags: kurosearch.ModifiedTag[];
	}

	let {
		dialog = $bindable(),
		name = $bindable(''),
		description = $bindable(''),
		tags
	}: Props = $props();

	type LocalSearchableTag = { modifier: '+' | '-' | '~'; name: string };
	const dispatch = createEventDispatcher<{
		submit: { name: string; description: string; tags: LocalSearchableTag[] };
	}>();
	const close = () => dialog.close();

	let valid = $derived(name !== '' && tags.length > 1);
</script>

<Dialog on:close={close} bind:dialog>
	<section>
		<h3>Create Supertag</h3>

		<button type="button" class="codicon codicon-close" aria-label="Close dialog" onclick={close}
		></button>

		<div>
			<label for="supertag-name"> Name </label>
			<input type="text" bind:value={name} placeholder="Descriptive name" id="supertag-name" />
		</div>

		<div>
			<label for="supertag-description"> Description </label>
			<input
				type="text"
				bind:value={description}
				placeholder="Short description"
				id="supertag-description"
			/>
		</div>

		<div>
			<span> Tags</span>
			<ol>
				{#each tags as tag (tag.modifier + ':' + tag.name)}
					<DetailedTag {tag} />
				{/each}
			</ol>
		</div>
		<div class="last">
			<TextButton
				title={valid ? 'Click to create supertag' : 'Enter a valid name to continue'}
				disabled={!valid}
				on:click={() => {
					dispatch('submit', {
						name,
						description,
						tags: tags.map(({ modifier, name }) => ({ modifier, name }))
					});
					close();
				}}
			>
				Create supertag
			</TextButton>
		</div>
	</section>
</Dialog>

<style lang="scss">
	section {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: var(--small-gap);
		border-radius: var(--border-radius);
	}

	button {
		background-color: unset;
		justify-self: end;
	}

	div {
		grid-column: span 2;
	}

	.last {
		display: grid;
		place-items: center;
	}

	label,
	span {
		display: block;
		margin-bottom: var(--tiny-gap);
		color: var(--text);
		font-size: var(--text-size-small);
	}

	input {
		width: 100%;
		background-color: var(--background-1);
		border: unset;
		height: var(--line-height);
		padding-inline: var(--small-gap);
		border-radius: var(--border-radius);
	}

	ol {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}
</style>
