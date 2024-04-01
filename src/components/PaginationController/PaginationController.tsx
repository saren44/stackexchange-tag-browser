import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import ArrowForward from '@mui/icons-material/ArrowForward'
import ArrowBack from '@mui/icons-material/ArrowBack'
import { IconButton, Typography } from '@mui/material'
import { useState } from 'react'
import { useTagData } from '../../hooks'



export const PaginationController = () => {
	const [val, setVal] = useState<number>(50);
	const { currentPage, increasePage, decreasePage, itemsPerPage, setItemsPerPage} = useTagData() 

	const handleInput = (e: number) => {
		console.log(e)
		if (isNaN(e) || e < 0 || e > 100) {
			setVal(-1)
		}
		else {
			setVal(e)
		}
		
	}

	return(
		<Box>
			<TextField helperText={val === -1 ? 'incorrect entry' : 'items per page (1 - 100)'} size='small' onChange={(e) => handleInput(+e.target.value)} error={val === -1} inputProps={{'inputMode': 'numeric', 'aria-label': 'whatever you want'}}/>
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