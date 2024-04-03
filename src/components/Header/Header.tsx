import { Box, MenuItem, Select, SortDirection } from "@mui/material"
import { FilterInput } from "../FilterInput/FilterInput"
import { ThemeSwitch } from "../ThemeSwitch"
import { PaginationController } from "../PaginationController/PaginationController"
import { useTagData } from "../../hooks"
import { SortByType, SortDirType } from "../../hooks/types"

interface IHeaderProps {
	top: boolean
}

export const Header = ({top}: IHeaderProps) => {
	const setSortBy = useTagData((state) => state.setSortBy)
	const setSortDir = useTagData((state) => state.setSortDir)

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
			height: top ? '120px' : '80px',
			width: top ? '90%' : '70%'
		}}
	>
		
		<FilterInput top={top}/>
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

		<PaginationController top={top}/>
		<ThemeSwitch />
	</Box>
	)
}