import { mainApi } from '@/api'
import type { LoginInput, PublicUser, RegisterInput, TokenPair } from './types'

export async function register(input: RegisterInput) {
	const { data } = await mainApi.post<PublicUser>('/auth/register', input)
	return data
}

export async function login(input: LoginInput) {
	const { data } = await mainApi.post<TokenPair>('/auth/login', input)
	return data
}

export async function logout(refreshToken: string) {
	await mainApi.post('/auth/logout', { refreshToken })
}
