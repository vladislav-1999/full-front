import { Icon, IconProps } from '@chakra-ui/react'

const CloseIcon = (props: IconProps) => (
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
				d="m7 7 10 10M7 17 17 7"
			/>
		</svg>
	</Icon>
)

export default CloseIcon
