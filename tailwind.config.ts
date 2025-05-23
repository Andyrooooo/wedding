import { join } from 'path'
import type { Config } from 'tailwindcss'
import forms from '@tailwindcss/forms';
import { skeleton } from '@skeletonlabs/tw-plugin';
import { wedding } from './src/wedding'

export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}', join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')],
	theme: {
		extend: {
			fontFamily: {
				cursive: ['Cedarville Cursive', 'cursive'],
				proper: ['Roboto Serif', 'serif']
			},
			colors: {
				'rust': '#6C2D1C',
				'beige': '#CDC6BD',
			},
			transitionDelay: {
				600: '600ms',
				800: '800ms',
				900: '900ms',
			},
		},
	},
	plugins: [
		forms,
		skeleton({
			themes: {
				custom: [
					wedding,
				],
			},
		}),
	],
} satisfies Config;
