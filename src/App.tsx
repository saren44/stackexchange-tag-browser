import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ThemeSwitch } from './components/ThemeSwitch'
import { TagTable } from './components/TagsTable/TagsTableNew'
import { useModalManager } from './hooks/useModalManager'
import { FilterInput } from './components/FilterInput/FilterInput'
import { CssBaseline, ThemeProvider, Typography, createTheme } from '@mui/material'
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

	const [isMobile, setIsMobile] = useState<boolean>(false);


	function handleWindowSizeChange() {
    if (!isMobile && window.innerWidth <= 768)
			setIsMobile(true)
		else if (isMobile && window.innerWidth > 768)
			setIsMobile(false)
	}

	useEffect(() => {
		
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
        window.removeEventListener('resize', handleWindowSizeChange);
    }
	});

	const currentModal = useModalManager((state) => state.currentModal)
	const isLightTheme = useThemeSwitch((state) => state.isLight)

  return (
		<ThemeProvider theme={isLightTheme ? themeLight : themeDark}>
			<CssBaseline />
		{
			isMobile ?
			(
			<>
				<div style={{maxHeight: '15vh', marginTop: '1vh'}}>
					<FilterInput />
					<div style={{position: 'absolute', top: 30, right: 30}}>
						<ThemeSwitch />
					</div>
					
				</div>
				<div style={{width: '100vw', overflowX: 'hidden', overflowY: 'hidden'}}>
					<TagTable />
				</div>
				{currentModal && currentModal}
			</>
			) : (
				<>
				<div style={{height: '10vh', marginTop: '1vh'}}>
					<FilterInput />
					<div style={{position: 'absolute', top: 30, right: 30}}>
						<ThemeSwitch />
					</div>
				</div>
				<div style={{width: '60%', minWidth: 768, maxHeight: '85vh'}}>
					<TagTable />
				</div>
				{currentModal && currentModal}
			</>
			)
		}


    </ThemeProvider>
  )
}

export default App
