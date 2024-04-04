import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ThemeSwitch } from './components/ThemeSwitch'
import { TagTable, TagTableWrapper } from './components/TagsTable/TagsTableNew'
import { useModalManager } from './hooks/useModalManager'
import { FilterInput } from './components/FilterInput/FilterInput'
import { CssBaseline, ThemeProvider, Typography, createTheme } from '@mui/material'
import { useThemeSwitch } from './hooks'
import { Header } from './components/Header/Header'
import { PageWrapper } from './components/PageWrapper/PageWrapper'
import { MobileWrapper } from './components/MobileWrapper/MobileWrapper'
import { PaginationButtons } from './components/PaginationController/PaginationController'

const themeLight = createTheme({
  palette: {
		mode: 'light',
    background: {
      default: "#d4d4d4"
    },
    primary: {
			main: '#222222'
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
			main: '#d4d4d4'
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
			<MobileWrapper>
				<div style={{position: 'absolute', top: 20, right: 20, zIndex: 11}}>
					<ThemeSwitch />
				</div>
				<Header mobile/>
				<div style={{width: '100vw', overflowX: 'hidden', overflowY: 'hidden'}}>
					<TagTableWrapper />
				</div>
				<PaginationButtons />
			</MobileWrapper>
				{currentModal && currentModal}
			</>
			) : (
				<>
				<PageWrapper>
					<Header mobile={false}/>
					<div style={{width: '70%', minWidth: 768}}>
						<TagTableWrapper />
					</div>
				</PageWrapper>	

				{currentModal && currentModal}
			</>
			)
		}


    </ThemeProvider>
  )
}

export default App
