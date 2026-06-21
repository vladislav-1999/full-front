import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { login, register } from '..'
import { tokenStorage } from '../token'
import type { LoginInput, LoginResponseData, PublicUser, RegisterInput } from '../types'
import { MainApiError } from '@/api/types/helpers/MainApiError'

export function useLogin(options?: UseMutationOptions<LoginResponseData, MainApiError, LoginInput>) {
	return useMutation({
		mutationFn: (input: LoginInput) => login(input),
		...options,
		onSuccess: (data, ...rest) => {
			if (data.token) tokenStorage.set(data.token)
			options?.onSuccess?.(data, ...rest)
		},
	})
}

export function useRegister(options?: UseMutationOptions<PublicUser, MainApiError, RegisterInput>) {
	return useMutation({
		mutationFn: (input: RegisterInput) => register(input),
		...options,
	})
}
