'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Input, Text } from '@chakra-ui/react'
import { useLogin, useRegister } from '@/api/auth/mutations'
import { authSchema, type AuthForm } from './schema'

export default function LoginPage() {
	const router = useRouter()
	const [lastValues, setLastValues] = useState<AuthForm | null>(null)
	const [isLogin, setIsLogin] = useState(true)

	const loginMutation = useLogin({ onSuccess: () => router.push('/tasks') })
	const registerMutation = useRegister({ onSuccess: () => loginMutation.mutate(lastValues!) })

	const {
		register: field,
		handleSubmit,
		formState: { errors },
	} = useForm<AuthForm>({ resolver: zodResolver(authSchema) })

	const active = isLogin ? loginMutation : registerMutation

	const onSubmit = handleSubmit((values: AuthForm) => {
		setLastValues(values)
		active.mutate(values)
	})

	return (
		<Box
			h="100dvh"
			display="flex"
			flexDirection="column"
			alignItems="center"
			justifyContent="center"
			gap="1.6rem"
		>
			<Text>{isLogin ? 'Вход' : 'Регистрация'}</Text>

			<form onSubmit={onSubmit}>
				<Box
					display="flex"
					flexDirection="column"
					gap=".8rem"
					w="28rem"
				>
					<Input
						placeholder="email"
						{...field('email')}
					/>
					{errors.email && <Text color="red">{errors.email.message}</Text>}

					<Input
						type="password"
						placeholder="пароль"
						{...field('password')}
					/>
					{errors.password && <Text color="red">{errors.password.message}</Text>}

					<Button
						type="submit"
						loading={active.isPending}
						color="white"
					>
						{isLogin ? 'Войти' : 'Зарегистрироваться'}
					</Button>

					{active.error && <Text color="red">{active.error.message}</Text>}
				</Box>
			</form>

			<Button
				variant="ghost"
				onClick={() => setIsLogin((v) => !v)}
				color="white"
			>
				{isLogin ? 'Нет аккаунта? Регистрация' : 'Уже есть аккаунт? Вход'}
			</Button>
		</Box>
	)
}
