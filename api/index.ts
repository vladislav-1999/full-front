import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { tokenStorage } from '@/api/auth/token'
import { MainApiError } from '@/api/types/helpers/MainApiError'
import type { TokenPair } from './auth/types'

type RetriableConfig = InternalAxiosRequestConfig & { _retry?: boolean }

export const mainApi = axios.create({
	baseURL: process.env.NEXT_PUBLIC_MAIN_API,
	adapter: 'fetch',
	fetchOptions: { cache: 'no-store' },
})

mainApi.interceptors.request.use((config) => {
	const token = tokenStorage.getAccess()
	if (token) config.headers.Authorization = `Bearer ${token}`
	return config
})

let refreshPromise: Promise<string> | null = null
async function runRefresh(): Promise<string> {
	const refreshToken = tokenStorage.getRefresh()
	if (!refreshToken) throw new Error('No refresh token')

	const { data } = await axios.post<TokenPair>(`${process.env.NEXT_PUBLIC_MAIN_API}/auth/refresh`, refreshToken)
	tokenStorage.set(data)

	return data.accessToken
}

mainApi.interceptors.response.use(
	(response) => response,

	async (error: AxiosError<{ error?: string }>) => {
		const original = error.config as RetriableConfig | undefined
		const status = error.response?.status
		const isAuthRoute = original?.url?.includes('/auth')

		if (status === 401 && original && !original._retry && !isAuthRoute) {
			original._retry = true

			try {
				refreshPromise ??= runRefresh().finally(() => {
					refreshPromise = null
				})
				await refreshPromise
				return mainApi(original)
			} catch {
				tokenStorage.clear()
				if (typeof window !== 'undefined') window.location.href = '/login'
			}
		}

		const message = error.response?.data?.error ?? 'Server error'
		throw new MainApiError(message, status ?? 0)
	},
)
