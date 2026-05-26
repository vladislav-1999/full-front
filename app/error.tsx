'use client'

import { Box } from '@chakra-ui/react'

export default function Error() {
	return (
		<Box
			bg="black"
			color="white"
			boxSize="full"
			h="100dvh"
			display="flex"
			justifyContent="center"
			alignItems="center"
			fontSize="2xl"
		>
			error
		</Box>
	)
}
