import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query'
import { login, register, logout } from '..'
import { tokenStorage } from '../token'
import type { LoginInput, PublicUser, RegisterInput, TokenPair } from '../types'
import { MainApiError } from '@/api/types/helpers/MainApiError'
import { authStatusKey } from '../queries'

export function useLogin(options?: UseMutationOptions<TokenPair, MainApiError, LoginInput>) {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (input: LoginInput) => login(input),
		...options,
		onSuccess: (data, ...rest) => {
			tokenStorage.set(data)
			queryClient.setQueryData(authStatusKey, true)
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

export function useLogout(options?: UseMutationOptions<void, MainApiError, void>) {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async () => {
			const refreshToken = tokenStorage.getRefresh()
			if (refreshToken) await logout(refreshToken)
		},
		...options,
		onSettled: (...args) => {
			tokenStorage.clear()
			queryClient.clear()
			queryClient.setQueryData(authStatusKey, false)
			options?.onSettled?.(...args)
		},
	})
}
