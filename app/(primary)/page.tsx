'use client'

import { Box, Button, Spinner, Text } from '@chakra-ui/react'
import { useTasks } from '@/api/tasks/queries'
import { useDeleteTask } from '@/api/tasks/mutations'

export default function Page() {
	const { data, isLoading, isError } = useTasks()
	const { mutate, isPending, variables } = useDeleteTask()

	if (isLoading) return <Spinner />
	if (isError) return <Text>Ошибка загрузки</Text>

	console.log(data)

	return (
		<Box
			bg="black"
			color="white"
			h="100dvh"
			p="4"
		>
			{data?.map((task) => (
				<Box>
					<Text key={task.id}>{task.title}</Text>
					<Button
						onClick={() => mutate(task.id)}
						loading={isPending && variables === task.id}
					>
						Delete
					</Button>
				</Box>
			))}
		</Box>
	)
}
