import { Box } from '@chakra-ui/react'

import { ReactNode } from 'react'

export default function PrimaryLayout({ children }: { children: ReactNode }) {
	return (
		<Box
			bg="black"
			h="100dvh"
		>
			{children}
		</Box>
	)
}
