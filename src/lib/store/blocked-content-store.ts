import { persistentWritable } from './persistent-store';
import { StoreKey } from './store-keys';

const getInitial = (): Record<kurosearch.BlockingGroup, boolean> => ({
	'AI-Generated': false,
	'Animal-Related': false,
	'Non-Consensual': false,
	Gore: false,
	Scat: false,
	Vore: false
});

const createBlockedContentStore = () => {
	const { subscribe, set } = persistentWritable<Record<kurosearch.BlockingGroup, boolean>>(
		StoreKey.BlockedContent,
		getInitial()
	);

	return {
		subscribe,
		set,
		reset: () => set(getInitial())
	};
};

export default createBlockedContentStore();
