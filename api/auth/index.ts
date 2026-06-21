import { mainApi } from '@/api'
import type { LoginInput, LoginResponseData, PublicUser, RegisterInput } from './types'

export async function register(input: RegisterInput) {
	const { data } = await mainApi.post<PublicUser>('/auth/register', input)
	return data
}

export async function login(input: LoginInput) {
	const { data } = await mainApi.post<LoginResponseData>('/auth/login', input)
	return data
}
