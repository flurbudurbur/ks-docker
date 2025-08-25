export const ALL_BLOCKING_GROUPS: readonly kurosearch.BlockingGroup[] = Object.freeze([
	'AI-Generated',
	'Animal-Related',
	'Non-Consensual',
	'Gore',
	'Scat',
	'Vore'
]);

export const BLOCKING_GROUP_TAGS: Record<kurosearch.BlockingGroup, readonly string[]> =
	Object.freeze({
		'AI-Generated': Object.freeze(['ai_generated']),
		'Animal-Related': Object.freeze([
			'zoophilia',
			'zoo',
			'canine*',
			'equine*',
			'*feral*',
			'bestiality',
			'zoophilia',
			'animal'
		]),
		'Non-Consensual': Object.freeze([
			'captive',
			'captured',
			'defeated',
			'rape',
			'*_slave',
			'no_consent',
			'molestation',
			'non-con*',
			'scared',
			'forced'
		]),
		Gore: Object.freeze(['gore', 'necrophilia', 'amputee', 'guro', 'blood', 'amputed*']),
		Scat: Object.freeze(['scat', 'diaper', 'fart']),
		Vore: Object.freeze(['vore']),
		Yuri: Object.freeze([
			'yuri',
			'female_focus',
			'female_only',
			'*girls',
			'1girl',
			'lesbian*',
			'mutial_yuri'
		]),
		Yaoi: Object.freeze(['yaoi', 'male_focus', 'male_only', '*boys', '1boy', 'gay*'])
	});
