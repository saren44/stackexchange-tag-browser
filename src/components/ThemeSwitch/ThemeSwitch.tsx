import { Checkbox } from '@mui/material'
import { useThemeSwitch } from '../../hooks'
import { DarkModeTwoTone, LightModeTwoTone } from '@mui/icons-material'




export const ThemeSwitch = () => {
	const switchTheme = useThemeSwitch((state) => state.switchTheme)
	const lightDefault = useThemeSwitch((statte) => statte.lightDefault)

	return (
		<Checkbox 
			onChange={switchTheme} 
			defaultChecked={lightDefault} 
			icon={<LightModeTwoTone />} 
			checkedIcon={<DarkModeTwoTone />}
			sx={{
				color: 'yellow',
				'&.Mui-checked': {
					color: 'black',
				},
			}}
		/>
	)
}