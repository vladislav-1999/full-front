'use client'

import { Box, Button } from '@chakra-ui/react'
import { ReactNode } from 'react'
import Link from 'next/link'
import { Pages } from '@/constants/pages'
import { useRouter } from 'next/navigation'
import { useLogout } from '@/api/auth/mutations'
import { useIsAuthenticated } from '@/api/auth/queries'

export default function PrimaryLayout({ children }: { children: ReactNode }) {
	const router = useRouter()
	const logoutMutation = useLogout({ onSettled: () => router.push('/login') })

	const isAuth = useIsAuthenticated()

	return (
		<Box
			bg="black"
			h="100dvh"
		>
			{isAuth ? (
				<Button
					color="white"
					onClick={() => logoutMutation.mutate()}
					loading={logoutMutation.isPending}
				>
					ВЫЙТИ
				</Button>
			) : (
				<Button
					asChild
					color="white"
				>
					<Link href={Pages.LOGIN}>ЛОГИН</Link>
				</Button>
			)}
			{children}
		</Box>
	)
}
