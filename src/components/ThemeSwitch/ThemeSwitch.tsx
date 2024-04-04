import Checkbox from '@mui/material/Checkbox'
import { useThemeSwitch } from '../../hooks'
import DarkModeTwoTone from '@mui/icons-material/DarkModeTwoTone'
import LightModeTwoTone from '@mui/icons-material/LightModeTwoTone'




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