import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import Select from "@mui/material/Select"
import { FilterInput } from "../FilterInput/FilterInput"
import { ThemeSwitch } from "../ThemeSwitch"
import { PaginationController } from "../PaginationController/PaginationController"
import { useTagData } from "../../hooks"
import { SortByType, SortDirType } from "../../hooks/types"
import { useState, useEffect } from "react"

interface IHeaderProps {
	mobile: boolean
}

export const Header = ({mobile}: IHeaderProps) => {
	const setSortBy = useTagData((state) => state.setSortBy)
	const setSortDir = useTagData((state) => state.setSortDir)
	const [isTop, setIsTop] = useState<boolean>(true);

	function handleScrollCheck() {
		if (window.scrollY <= 35 && !isTop) {
			setIsTop(true)
		}
		else if (window.scrollY > 35 && isTop) {
			setIsTop(false)
		}
	}

	useEffect(() => {
		window.addEventListener('scroll', handleScrollCheck);
    return () => {
				window.removeEventListener('scroll', handleScrollCheck);
    }
	});

	return (
	<Box
		display={'flex'}
		flexDirection={mobile ? 'column' : 'row'}
		alignItems={'center'}
		justifyContent={'space-between'}
		top={0}
		position={mobile ? 'relative' : 'sticky'}
		bgcolor={'background.default'}
		zIndex={10}
		sx={{
			transitionProperty: 'width, height',
			transitionDuration: '0.3s',
			transitionDelay: '0s',
			height: mobile ? '' : isTop ? '120px' : '80px',
			width: mobile ? '100%' : (isTop ? '90%' : '70%'),
			minWidth: mobile ? '' : '768px',
			gap: mobile ? '10px' : '',
			marginTop: mobile ? '20px' : '',
		}}
	>
		
		<FilterInput top={isTop}/>
		<Select
    labelId="sortby-select-label"
    id="sortby-select"
    defaultValue={"popular"}
    onChange={(e) => setSortBy(e.target.value as (SortByType))}
		color='primary'
		size={top ? 'medium' : 'small'}
  >
    <MenuItem value={"name"}>Name</MenuItem>
    <MenuItem value={"popular"}>Count</MenuItem>
  </Select>
		<Select
    labelId="sortdir-select-label"

    id="sortrdir-label"
    defaultValue={"desc"}
    onChange={(e) => setSortDir(e.target.value as (SortDirType))}
		size={top ? 'medium' : 'small'}
		color='primary'
  >
    <MenuItem value={"asc"}>Ascending</MenuItem>
    <MenuItem value={"desc"}>Descending</MenuItem>
  </Select>

		<PaginationController top={isTop}/>
		{!mobile && <ThemeSwitch />}
	</Box>
	)
}