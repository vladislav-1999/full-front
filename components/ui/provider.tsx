'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { ColorModeProvider, ColorModeProviderProps } from './color-mode'
import theme from '@/theme/primary'
import { Toaster } from '@/components/ui/toaster'

export function Provider(props: ColorModeProviderProps) {
	return (
		<ChakraProvider value={theme}>
			<ColorModeProvider
				defaultTheme="light"
				{...props}
			/>
			<Toaster />
		</ChakraProvider>
	)
}
