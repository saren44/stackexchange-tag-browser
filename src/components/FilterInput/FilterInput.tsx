import TextField from '@mui/material/TextField'
import { useTagFilter } from '../../hooks'
import Search from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton'
import { Box } from '@mui/material';
import { useRef } from 'react';


export const FilterInput = () => {
	const setFilter = useTagFilter((state) => state.setFilter);
	const inputRef = useRef<HTMLInputElement>(null)

	const commitText = () => {
		inputRef.current !== null && setFilter(inputRef.current.value);
	}


	return (
		<Box
			display={'flex'}
			flexDirection={'row'}
			alignItems={'center'}
		>
			<TextField  inputRef={inputRef}/>
			<IconButton onClick={commitText}>
				<Search />
			</IconButton>
		</Box>
	)
}