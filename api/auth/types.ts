import type { components, paths } from '@/src/types/api'

type Schemas = components['schemas']

export type RegisterInput = Schemas['RegisterInput']
export type LoginInput = Schemas['LoginInput']
export type PublicUser = Schemas['PublicUser']
export type TokenPair = Schemas['TokenPair']
export type RefreshInput = Schemas['RefreshInput']
