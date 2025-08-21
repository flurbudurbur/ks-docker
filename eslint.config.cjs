const { defineConfig, globalIgnores } = require('eslint/config');

const tsParser = require('@typescript-eslint/parser');
const typescriptEslint = require('@typescript-eslint/eslint-plugin');
const tseslint = require('typescript-eslint');
const globals = require('globals');
const svelteParser = require('svelte-eslint-parser');
const svelte = require('eslint-plugin-svelte');
const js = require('@eslint/js');
const prettier = require('eslint-config-prettier');

module.exports = defineConfig([
	// Core JS recommended rules
	js.configs.recommended,

	// TypeScript recommended (flat) configs
	...tseslint.configs.recommended,

	// Svelte recommended (flat) configs
	...svelte.configs['flat/recommended'],

	// Base config for JS/TS files
	{
		languageOptions: {
			parser: tsParser,
			sourceType: 'module',
			ecmaVersion: 2020,
			parserOptions: {
				extraFileExtensions: ['.svelte']
			},
			globals: {
				...globals.browser,
				...globals.node
			}
		},
		plugins: {
			'@typescript-eslint': typescriptEslint
		}
	},

	// Override for Svelte files
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parser: svelteParser,
			parserOptions: {
				// Use TS parser inside <script> blocks
				parser: '@typescript-eslint/parser'
			}
		}
	},

	// Global ignores
	globalIgnores([
		'**/.DS_Store',
		'**/node_modules',
		'build',
		'.svelte-kit',
		'package',
		'**/.env',
		'**/.env.*',
		'!**/.env.example',
		'**/pnpm-lock.yaml',
		'**/package-lock.json',
		'**/yarn.lock',
		'eslint.config.*'
	]),

	// Disable formatting-related rules in favor of Prettier
	prettier
]);
