import { useMutation, useQueryClient, UseMutationOptions } from '@tanstack/react-query'
import { deleteTask } from '..'
import { mainApiQueryKeys } from '@/api/queryKeys'
import { MainApiError } from '@/api/types/helpers/MainApiError'

export function useDeleteTask(options?: UseMutationOptions<void, MainApiError, number>) {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (id: number) => deleteTask(id),
		...options,
		onSuccess: (...args) => {
			queryClient.invalidateQueries({ queryKey: mainApiQueryKeys.tasks.all.queryKey })
			options?.onSuccess?.(...args)
		},
		onError: (...args) => {
			/* toaster.create(...) */
			options?.onError?.(...args)
		},
	})
}
