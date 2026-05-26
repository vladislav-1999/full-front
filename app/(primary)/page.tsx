'use client'

import { useState } from 'react'
import { Box, Button, Input, Spinner, Text } from '@chakra-ui/react'
import { useTasks } from '@/api/tasks/queries'
import { useAddTask, useDeleteTask } from '@/api/tasks/mutations'

export default function Page() {
	const [task, setTask] = useState<string>('')

	const { data, isLoading, isError } = useTasks()
	const { mutate, isPending, variables } = useDeleteTask()
	const { mutate: addTask, isPending: isAdding, variables: addVariables } = useAddTask()

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
			<Box
				display="flex"
				gap=".8rem"
			>
				<Input
					color="black"
					value={task}
					onChange={(e) => setTask(e.target.value)}
				/>
				<Button
					p=".4rem"
					bg="white"
					rounded=".8rem"
					color="black"
					onClick={() => addTask(task)}
				>
					Add Task
				</Button>
			</Box>
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
