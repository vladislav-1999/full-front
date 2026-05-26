import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { mainApiQueryKeys, type MainApiQueryKeys } from '@/api/queryKeys'
import { TasksResponseData } from '../types'

export function useTasks<T = TasksResponseData>(
	options?: Omit<UseQueryOptions<TasksResponseData, unknown, T, MainApiQueryKeys['tasks']['all']['queryKey']>, 'queryKey' | 'queryFn'>,
) {
	return useQuery({
		...mainApiQueryKeys.tasks.all,
		...options,
	})
}
