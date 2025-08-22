<script lang="ts">
	import Heading3 from '../heading/Heading3.svelte';

	interface Props {
		title: string;
		description: string;
		children?: import('svelte').Snippet;
	}

	let { title, description, children }: Props = $props();
</script>

<div>
	<Heading3>{title}</Heading3>
	<p>{description}</p>
	{@render children?.()}
</div>

<style lang="scss">
	p {
		margin-block-end: var(--grid-gap);
	}
</style>
