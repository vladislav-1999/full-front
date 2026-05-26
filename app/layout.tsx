import { ReactNode, Suspense } from 'react'
import { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import Provider from './provider'

const manrope = Manrope({
	subsets: ['latin', 'cyrillic'],
	variable: '--font-manrope',
	display: 'swap',
})

export const metadata: Metadata = {
	title: 'ВСМ — Личный кабинет',
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html
			lang="ru"
			className={manrope.variable}
			suppressHydrationWarning
		>
			<head>
				<meta
					name="apple-mobile-web-app-title"
					content="ВСМ"
				/>
			</head>
			<body>
				<Suspense>
					<Provider>{children}</Provider>
				</Suspense>
			</body>
		</html>
	)
}
