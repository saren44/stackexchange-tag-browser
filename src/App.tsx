import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ThemeSwitch } from './components/ThemeSwitch'
import { TagTable } from './components/TagsTable/TagsTableNew'
import { useModalManager } from './hooks/useModalManager'
import { FilterInput } from './components/FilterInput/FilterInput'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { useThemeSwitch } from './hooks'

const themeLight = createTheme({
  palette: {
		mode: 'light',
    background: {
      default: "#ffffff"
    },
    primary: {
			main: '#000000'
		},
		secondary: {
			main: '#00ff00'
		}
  }
});

const themeDark = createTheme({
  palette: {
		mode: 'dark',
    background: {
      default: "#222222"
    },
    primary: {
			main: '#ffffff'
		},
		secondary: {
			main: '#ffff00'
		}
  }
});

function App() {

	const currentModal = useModalManager((state) => state.currentModal)
	const isLightTheme = useThemeSwitch((state) => state.isLight)

  return (
    <ThemeProvider theme={isLightTheme ? themeLight : themeDark}>
		<CssBaseline />
		<div style={{position: 'absolute', top: 30, right: 30}}>
			<ThemeSwitch />
		</div>

		<div style={{width: '60vw', height: '80%'}}>
			<FilterInput />
			<TagTable />
		</div>
		{currentModal && currentModal}

    </ThemeProvider>
  )
}

export default App
