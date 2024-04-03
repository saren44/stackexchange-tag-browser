import TextField from '@mui/material/TextField'
import { useTagData, useTagFilter } from '../../hooks'
import Search from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton'
import { Box } from '@mui/material';
import { useEffect, useRef } from 'react';
import InputAdornment from '@mui/material/InputAdornment';


interface IFilterInputProps {
	top: boolean
}

export const FilterInput = ({top} : IFilterInputProps) => {
	const setFilter = useTagData((state) => state.setFilter);
	const inputRef = useRef<HTMLInputElement>(null)

	const commitText = () => {
		console.log('search')
		inputRef.current !== null && setFilter(inputRef.current.value);
	}

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			commitText()
			inputRef.current !== null && inputRef.current.blur()
		}

	}



	return (
		<Box
			display={'flex'}
			flexDirection={'row'}
			alignItems={'center'}
		>
			<TextField 
			onKeyDown={handleKeyPress}
			inputRef={inputRef} label={"search"} size='small'
			helperText={top && 'enter name query'}
			color='primary'

			InputProps={{
				endAdornment: 
				<InputAdornment position="end">
					<IconButton onClick={commitText}>
						<Search />
					</IconButton>
				</InputAdornment>,
			}}
			/>

		</Box>
	)
}