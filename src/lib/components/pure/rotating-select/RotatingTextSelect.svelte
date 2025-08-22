<script lang="ts">
	import IconButton from '../button-icon/IconButton.svelte';

	interface Props {
		options: Record<string, string>;
		value: string;
		id?: string | undefined;
	}

	let { options, value = $bindable(), id = undefined }: Props = $props();

	let index = $derived(Object.keys(options).indexOf(value));
	let entries = $derived(Object.entries(options));
	let text = $derived(entries[index][1]);

	const rotate = () => {
		index = (index + 1) % entries.length;
		value = entries[index][0];
	};
</script>

<IconButton {id} on:click={rotate}>{text}</IconButton>
