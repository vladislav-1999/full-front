import { useQuery } from '@tanstack/react-query'
import { tokenStorage } from '../token'

export const authStatusKey = ['auth', 'status'] as const

export function useIsAuthenticated() {
	const { data } = useQuery({
		queryKey: authStatusKey,
		queryFn: () => Boolean(tokenStorage.getRefresh()),
		initialData: false,
		staleTime: Infinity,
	})

	return data
}
