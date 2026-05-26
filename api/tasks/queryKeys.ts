import { createQueryKeys } from '@lukemorales/query-key-factory'
import { getTasks } from '.'

export const tasksQueryKeys = createQueryKeys('tasks', {
	all: {
		queryKey: null,
		queryFn: getTasks,
	},
})
