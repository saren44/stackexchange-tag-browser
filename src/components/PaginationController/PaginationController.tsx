import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import ArrowForward from '@mui/icons-material/ArrowForward'
import ArrowBack from '@mui/icons-material/ArrowBack'
import { IconButton, Typography } from '@mui/material'
import { useState } from 'react'
import { useTagData } from '../../hooks'

interface IPaginatioControllerProps {
	top: boolean
}


export const PaginationController = ({top}: IPaginatioControllerProps) => {
	const [val, setVal] = useState<number>(50);
	const { currentPage, increasePage, decreasePage, itemsPerPage, setItemsPerPage} = useTagData() 

	const handleInput = (e: number) => {
		console.log(e)
		if (isNaN(e) || e < 0 || e > 100) {
			setItemsPerPage(-1)
		}
		else {
			setItemsPerPage(e)
		}
		
	}

	return(
		<Box>
			<TextField color='primary' helperText={top && (itemsPerPage === -1 ? 'incorrect entry' : 'items per page (1 - 100)')} size='small' defaultValue={50} onChange={(e) => handleInput(+e.target.value)} error={itemsPerPage === -1} inputProps={{'inputMode': 'numeric', 'aria-label': 'whatever you want'}}/>
			<IconButton onClick={decreasePage} disabled={currentPage === 0}>
				<ArrowBack />
			</IconButton>
			<span> {currentPage} </span>
			<IconButton onClick={increasePage}>
				<ArrowForward />
			</IconButton>
		</Box>
	)
}