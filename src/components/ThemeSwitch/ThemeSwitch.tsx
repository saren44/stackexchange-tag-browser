import Checkbox from '@mui/material/Checkbox'
import { useThemeSwitch } from '../../hooks'
import { DarkModeTwoTone, LightModeTwoTone } from '@mui/icons-material'
import { pink } from '@mui/material/colors';





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