<script lang="ts">
	interface Props {
		checked: boolean;
		id: string;
		children?: import('svelte').Snippet;
	}

	let { checked = $bindable(), id, children }: Props = $props();
</script>

<label for={id}>
	<input type="checkbox" {id} bind:checked />
	{@render children?.()}
</label>

<style lang="scss">
	label {
		display: flex;
		align-items: center;
		gap: var(--grid-gap);
	}
</style>
