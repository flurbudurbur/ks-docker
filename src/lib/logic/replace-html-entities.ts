export const replaceHtmlEntities = (raw: string) =>
	raw
		.replaceAll('&#034;', '"')
		.replaceAll('&#039;', "'")
		.replaceAll('&eacute;', 'é')
		.replaceAll('&#038;', '&');
