import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	output: 'standalone',
	basePath: process.env.NEXT_PUBLIC_BASE_PATH,
	trailingSlash: false,
	typedRoutes: false,
	reactCompiler: true,
	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	experimental: {
		optimizePackageImports: ['@chakra-ui/react'],
	},
}

export default nextConfig
