import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ThemeSwitch } from './components/ThemeSwitch'
import { TagTable } from './components/TagsTable/TagsTableNew'
import { useModalManager } from './hooks/useModalManager'

function App() {

	const currentModal = useModalManager((state) => state.currentModal)

  return (
    <>
		<div style={{position: 'absolute', top: 30, right: 30}}>
			<ThemeSwitch />
		</div>

		<div style={{width: '60vw', height: '80%'}}>
			<TagTable />
		</div>
		{currentModal && currentModal}

    </>
  )
}

export default App
