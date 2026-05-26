import { TasksResponseData } from './types'
import { mainApi } from '@/api'

export async function getTasks() {
	const { data } = await mainApi.get<TasksResponseData>('/tasks')

	return data
}

export async function deleteTask(id: number) {
	await mainApi.delete(`/tasks/${id}`)
}
