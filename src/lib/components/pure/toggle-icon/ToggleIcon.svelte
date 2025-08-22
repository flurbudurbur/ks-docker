<script lang="ts">
	interface Props {
		title: string;
		icon: string;
		active: boolean;
	}

	let { title, icon, active = $bindable() }: Props = $props();

	const toggleActive = () => {
		active = !active;
	};
</script>

<button type="button" {title} aria-label={title} class={icon} class:active onclick={toggleActive}
></button>

<style lang="scss">
	button {
		background-color: unset;
		color: var(--text);
		width: var(--line-height);
		height: var(--line-height);
		line-height: var(--line-height);
		vertical-align: middle;
		text-align: center;
		font-size: var(--text-size-large);
	}

	button.active {
		color: var(--accent);
	}

	@media (hover: hover) {
		button {
			transition: color var(--default-transition-behaviour);
		}

		button:hover {
			color: var(--text-highlight);
		}

		button.active:hover {
			color: var(--accent-light);
		}
	}
</style>
