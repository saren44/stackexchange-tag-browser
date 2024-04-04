import { ThemeProvider } from "@mui/material"
import { themeDark, themeLight } from "../utils/themes"



// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const themeWrap = (Story: any, light: boolean) => {
	return(
		<ThemeProvider theme={light ? themeLight : themeDark} >
			<Story />
		</ThemeProvider>
	)
}