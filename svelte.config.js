import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import pkg from './package.json' with { type: 'json' };

const pkgVersion = pkg.version;

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [vitePreprocess()],
	kit: {
		adapter: adapter(),
		paths: {
			base: ''
		},
		appDir: 'app',
		version: {
			name: pkgVersion
		},
		csp: {
			mode: 'auto',
			directives: {
				'worker-src': ['self', 'blob:'],
				'default-src': ['self'],
				'style-src': ['self', 'unsafe-inline'],
				'script-src': [
					'self',
					'https://apis.google.com',
					'sha256-OkhWme9R0KBn9/HhayIdrq4L0tupV+XoB9Z6NlRtT8g=',
					'sha256-QQcRtQ7ld24zg8Aw+N4rSSUV74xluhui+0R1h02Axi4=',
					'sha256-fY0qLMpeUxpTNOQC5z9/kLxm8wqt0rKf6+suo48Hmnk='
				],
				'connect-src': [
					'self',
					'https://apis.google.com',
					'https://*.rule34.xxx',
					'https://*.googleapis.com',
					'https://api.github.com'
				],
				'img-src': ['self', 'data:', 'https://*.rule34.xxx', 'https://*.googleusercontent.com'],
				'media-src': ['self', 'https://*.rule34.xxx']
			}
		},
		prerender: {
			handleHttpError: ({ path, response }) => {
				if (path.startsWith('/r34')) return;
				throw new Error(`${response.status} ${path}`);
			}
		}
	}
};

export default config;
