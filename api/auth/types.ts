import type { components, paths } from '@/src/types/api'

type Schemas = components['schemas']

export type RegisterInput = Schemas['RegisterInput']
export type LoginInput = Schemas['LoginInput']
export type PublicUser = Schemas['PublicUser']

export type LoginResponseData = paths['/auth/login']['post']['responses']['200']['content']['application/json']
