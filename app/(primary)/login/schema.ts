import { z } from 'zod'

export const authSchema = z.object({
	email: z.email('Некорректный email'),
	password: z.string().min(8, 'Минимум 8 символов').max(128, 'Максимум 128 символов'),
})

export type AuthForm = z.infer<typeof authSchema>
