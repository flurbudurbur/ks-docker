<script lang="ts">
	import IconLink from './IconLink.svelte';

	interface Props {
		title: string;
		href: string;
		icon: string;
		newtab?: boolean;
	}

	let {
		title,
		href,
		icon,
		newtab = false
	}: Props = $props();
</script>

<IconLink {title} {href} {newtab}>
	<i class={icon}></i>
</IconLink>

<style lang="scss">
	i {
		height: 16px;
	}
</style>
