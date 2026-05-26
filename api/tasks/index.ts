import { TasksResponseData } from './types'
import { mainApi } from '@/api'

export async function getTasks() {
	const { data } = await mainApi.get<TasksResponseData>('/tasks')

	return data
}

export async function deleteTask(id: number) {
	await mainApi.delete(`/tasks/${id}`)
}

export async function addTask(title: string) {
	await mainApi.post(`/tasks`, { title })
}

export async function completeTask(id: number) {
	await mainApi.patch(`/tasks/${id}`, { done: true })
}
