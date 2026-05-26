'use client'

import { useState } from 'react'
import { Box, Button, Input, Spinner, Text } from '@chakra-ui/react'
import { useTasks } from '@/api/tasks/queries'
import { useAddTask, useCompleteTask, useDeleteTask } from '@/api/tasks/mutations'
import CloseIcon from '@/components/icons/CloseIcon'
import CheckIcon from '@/components/icons/CheckIcon'

export default function Page() {
	const [task, setTask] = useState<string>('')

	const { data, isLoading, isError } = useTasks()
	const { mutate, isPending, variables } = useDeleteTask()
	const { mutate: addTask, isPending: isAdding, variables: addVariables } = useAddTask()
	const { mutate: completeTask, isPending: isCompleting, variables: completeVariables } = useCompleteTask()

	if (isLoading) return <Spinner />
	if (isError) return <Text>Ошибка загрузки</Text>

	console.log(data)

	const handleAddTask = () => {
		addTask(task)
		setTask('')
	}

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
					onClick={handleAddTask}
				>
					Добавить задачу
				</Button>
			</Box>
			<Box>
				<Box>
					<Text>Новые задачи</Text>
					{data
						?.filter((task) => !task.done)
						.map((task) => (
							<Box
								key={task.id}
								display="flex"
								alignItems="center"
								gap=".8rem"
							>
								<Button onClick={() => completeTask(task.id)}>
									<CheckIcon />
								</Button>
								<Text key={task.id}>{task.title}</Text>
								<Button
									onClick={() => mutate(task.id)}
									loading={isPending && variables === task.id}
								>
									<CloseIcon />
								</Button>
							</Box>
						))}
				</Box>
				<Box>
					<Text>Выполненные задачи</Text>
					{data
						?.filter((task) => task.done)
						.map((task) => (
							<Box
								key={task.id}
								display="flex"
								alignItems="center"
								gap=".8rem"
							>
								<Text key={task.id}>{task.title}</Text>
								<Button
									onClick={() => mutate(task.id)}
									loading={isPending && variables === task.id}
								>
									<CloseIcon />
								</Button>
							</Box>
						))}
				</Box>
			</Box>
		</Box>
	)
}
