import { useMutation, useQueryClient, UseMutationOptions } from '@tanstack/react-query'
import { deleteTask, addTask } from '..'
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

export function useAddTask(options?: UseMutationOptions<void, MainApiError, string>) {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (title: string) => addTask(title),
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
