import { inferQueryKeyStore, mergeQueryKeys } from '@lukemorales/query-key-factory'
import { tasksQueryKeys } from './tasks/queryKeys'

export const mainApiQueryKeys = mergeQueryKeys(tasksQueryKeys)
export type MainApiQueryKeys = inferQueryKeyStore<typeof mainApiQueryKeys>
