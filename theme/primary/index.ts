import { createSystem, defaultBaseConfig, defineConfig } from '@chakra-ui/react'
import { textStyles } from '@/theme/primary/textStyles'
import { tokens, semanticTokens } from '@/theme/primary/tokens'
import globalCss from '@/theme/primary/globalCss'
import { keyframes } from '@/theme/primary/keyframes'
import { breakpoints } from '@/theme/primary/breakpoints'
import slotRecipes from '@/theme/primary/slotRecipes'
import recipes from '@/theme/primary/recipes'

const config = defineConfig({
	preflight: true,
	globalCss,
	theme: {
		breakpoints,
		tokens,
		textStyles,
		keyframes,
		slotRecipes,
		recipes,
		semanticTokens,
	},
})

export default createSystem(defaultBaseConfig, config)
