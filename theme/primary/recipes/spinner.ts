import { defineRecipe } from '@chakra-ui/react'

export const spinnerRecipe = defineRecipe({
	className: 'chakra-spinner',
	base: {
		display: 'inline-block',
		borderColor: 'currentColor',
		borderStyle: 'solid',
		borderWidth: '2px',
		borderRadius: '100%',
		width: 'var(--spinner-size)',
		height: 'var(--spinner-size)',
		animation: 'spin',
		animationDuration: '500ms',
		animationIterationCount: 'infinite',
		'--spinner-track-color': 'transparent',
		borderBottomColor: 'var(--spinner-track-color)',
		borderInlineStartColor: 'var(--spinner-track-color)',
	},
	variants: {
		size: {
			inherit: { '--spinner-size': '1em' },
			xs: { '--spinner-size': '0.75rem' },
			sm: { '--spinner-size': '1rem' },
			md: { '--spinner-size': '1.25rem' },
			lg: { '--spinner-size': '2rem' },
			xl: { '--spinner-size': '2.5rem' },
		},
	},
	defaultVariants: {
		size: 'xl',
	},
})
