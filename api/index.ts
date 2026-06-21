import axios from 'axios'
import { tokenStorage } from '@/api/auth/token'
import { MainApiError } from '@/api/types/helpers/MainApiError'

export const mainApi = axios.create({
	baseURL: process.env.NEXT_PUBLIC_MAIN_API,
	adapter: 'fetch',
	fetchOptions: { cache: 'no-store' },
})

mainApi.interceptors.request.use((config) => {
	const token = tokenStorage.get()
	if (token) config.headers.Authorization = `Bearer ${token}`
	return config
})

mainApi.interceptors.response.use(
	(response) => response,
	(error) => {
		const message = error?.response?.data?.error ?? 'Server error'
		const status = error?.response?.status ?? 0
		throw new MainApiError(message, status)
	},
)
