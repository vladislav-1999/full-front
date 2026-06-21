import type { components } from '@/src/types/api'
import { Task } from '@/api/types/common/Task'

type Schemas = components['schemas']

export type CreateTaskInput = Schemas['CreateTaskInput']
export type UpdateTaskInput = Schemas['UpdateTaskInput']

export type TasksResponseData = Task[]
