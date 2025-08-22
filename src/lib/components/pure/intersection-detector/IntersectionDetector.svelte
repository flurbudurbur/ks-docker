<script lang="ts">
	import { run } from 'svelte/legacy';

	import { createEventDispatcher } from 'svelte';

	
	interface Props {
		/**
	 * This prop should not change at runtime.
	 * Dynamically adjusting it is not implemented
	 */
		rootMargin: string;
		absoluteTop: string | undefined;
	}

	let { rootMargin, absoluteTop }: Props = $props();

	const dispatch = createEventDispatcher();
	const intersectionObserver = new IntersectionObserver(
		(entries) => {
			if (entries[0].isIntersecting) {
				dispatch('intersection');
			}
		},
		{ rootMargin }
	);

	let ref: HTMLDivElement = $state();

	run(() => {
		intersectionObserver.disconnect();
		if (ref) {
			intersectionObserver.observe(ref);
		}
	});
</script>

<div
	bind:this={ref}
	style={absoluteTop ? `position:absolute;top:${absoluteTop};` : undefined}
></div>
