export const API_URL = `/r34/index.php?page=dapi`;
export const R34_API_URL = `https://api.rule34.xxx/index.php?page=dapi`;
export const DOCKER_URL = `http://localhost:3000`;

export const URL_BASE = () =>
	typeof window !== 'undefined' && window.location?.origin
		? window.location.origin
		: 'http://localhost';
