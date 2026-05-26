import { Icon, IconProps } from '@chakra-ui/react'

const CheckIcon = (props: IconProps) => (
	<Icon
		asChild
		{...props}
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1em"
			height="1em"
			fill="none"
			viewBox="0 0 24 24"
		>
			<path
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
				d="m5 12 5 5L20 7"
			/>
		</svg>
	</Icon>
)

export default CheckIcon
