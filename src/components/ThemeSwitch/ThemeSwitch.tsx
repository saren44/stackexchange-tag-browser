import Checkbox from '@mui/material/Checkbox'
import { useTheme } from '../../hooks'
import { DarkModeTwoTone, LightModeTwoTone } from '@mui/icons-material'





export const ThemeSwitch = () => {
	const switchTheme = useTheme((state) => state.switchTheme);

	const handleThemeSwitch = (event: React.ChangeEvent) => {
		switchTheme();
	}

	return (
		<Checkbox onChange={handleThemeSwitch} defaultChecked icon={<DarkModeTwoTone />} checkedIcon={<LightModeTwoTone />}/>
	)
}