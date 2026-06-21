import { Box, Button } from '@chakra-ui/react'
import { ReactNode } from 'react'
import Link from 'next/link'
import { Pages } from '@/constants/pages'

export default function PrimaryLayout({ children }: { children: ReactNode }) {
	return (
		<Box
			bg="black"
			h="100dvh"
		>
			<Button
				asChild
				color="white"
			>
				<Link href={Pages.LOGIN}>ЛОГИН</Link>
			</Button>
			{children}
		</Box>
	)
}
