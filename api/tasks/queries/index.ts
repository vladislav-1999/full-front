import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { mainApiQueryKeys, type MainApiQueryKeys } from '@/api/queryKeys'
import { TasksResponseData } from '../types'
import { Task } from '@/api/types/common/Task'

export function useTasks<T = TasksResponseData>(
	options?: Omit<UseQueryOptions<TasksResponseData, unknown, T, MainApiQueryKeys['tasks']['all']['queryKey']>, 'queryKey' | 'queryFn'>,
) {
	return useQuery({
		...mainApiQueryKeys.tasks.all,
		...options,
	})
}

export function useTask<T = Task>(
	id: number,
	options?: Omit<UseQueryOptions<Task, unknown, T, MainApiQueryKeys['tasks']['byId']['queryKey']>, 'queryKey' | 'queryFn'>,
) {
	return useQuery({
		...mainApiQueryKeys.tasks.byId(id),
		...options,
	})
}
