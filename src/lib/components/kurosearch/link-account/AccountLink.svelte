<script lang="ts">
	import { base } from '$app/paths';
	import IconLink from '$lib/components/pure/icon-link/IconLink.svelte';

	interface Props {
		src: string | undefined;
	}

	let { src }: Props = $props();
</script>

<IconLink title="Account" href="{base}/account">
	{#if src}
		<img class="profile-picture" {src} alt="Account" />
	{:else}
		<i class="codicon codicon-account"></i>
	{/if}
</IconLink>

<style lang="scss">
	img,
	i {
		width: 16px;
		height: 16px;
		border-radius: 8px;
	}
</style>
