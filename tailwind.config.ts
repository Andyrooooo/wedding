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
				'light-rust': '#ED6C49',
				'beige': '#CDC6BD',
				'green': '#7E876E',
				'nude': '#BBA497',
				'terracotta': '#A9573C',
				'graphGreen': '#16A34A',
				'graphRed': '#DC2626',
				'graphOrange': '#EA580C',
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
