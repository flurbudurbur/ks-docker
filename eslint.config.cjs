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
		},
		rules: {
			// Relax TS/JS rules to avoid noisy errors; we still keep warnings for unused vars
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/ban-ts-comment': 'off',
			'no-async-promise-executor': 'off',
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					varsIgnorePattern: '^_',
					argsIgnorePattern: '^_',
					caughtErrorsIgnorePattern: '^_',
					ignoreRestSiblings: true
				}
			]
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
		},
		rules: {
			// Allow global TS namespaces (from app.d.ts) in Svelte type annotations
			'no-undef': 'off',
			// Use the TS-aware rule and ignore underscore-prefixed
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					varsIgnorePattern: '^_',
					argsIgnorePattern: '^_',
					caughtErrorsIgnorePattern: '^_',
					ignoreRestSiblings: true
				}
			],
			// Relax Svelte-specific strict rules to reduce false positives in app code
			'svelte/require-event-dispatcher-types': 'off',
			'svelte/require-each-key': 'off',
			'svelte/no-at-html-tags': 'off',
			'svelte/no-reactive-reassign': 'off',
			'svelte/no-immutable-reactive-statements': 'off'
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
