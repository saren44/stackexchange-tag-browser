import { Box } from "@mui/material"
import { FilterInput } from "../FilterInput/FilterInput"
import { ThemeSwitch } from "../ThemeSwitch"
import { PaginationController } from "../PaginationController/PaginationController"

interface IHeaderProps {
	top: boolean
}

export const Header = ({top}: IHeaderProps) => {



	return (
	<Box
		display={'flex'}
		flexDirection={'row'}
		alignItems={'center'}
		justifyContent={'space-between'}
		top={0}
		position={'sticky'}
		bgcolor={'background.default'}
		zIndex={10}
		sx={{
			transitionProperty: 'width, height',
			transitionDuration: '0.3s',
			transitionDelay: '0s',
			height: top ? '20vh' : '10vh',
			width: top ? '90%' : '70%'
		}}
	>
		
		<FilterInput top={top}/>
		<PaginationController top={top}/>
		<ThemeSwitch />
	</Box>
	)
}