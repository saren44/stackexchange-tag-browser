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
import { Header } from './components/Header/Header'
import { PageWrapper } from './components/PageWrapper/PageWrapper'

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
	const [isTop, setIsTop] = useState<boolean>(true);


	function handleWindowSizeChange() {
    if (!isMobile && window.innerWidth <= 768)
			setIsMobile(true)
		else if (isMobile && window.innerWidth > 768)
			setIsMobile(false)
	}

	function handleScrollCheck() {
		if (window.scrollY <= 35 && !isTop) {
			setIsTop(true)
		}
		else if (window.scrollY > 35 && isTop) {
			setIsTop(false)
		}
	}

	useEffect(() => {
		
    window.addEventListener('resize', handleWindowSizeChange);
		window.addEventListener('scroll', handleScrollCheck);
    return () => {
        window.removeEventListener('resize', handleWindowSizeChange);
				window.removeEventListener('scroll', handleScrollCheck);
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
					<FilterInput top/>
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
				<PageWrapper>
					<Header top={isTop}/>
					<div style={{width: '70%', minWidth: 768}}>
						<TagTable />
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
