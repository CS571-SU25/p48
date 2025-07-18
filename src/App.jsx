import { useState } from 'react'
import './App.css'
import { Box } from '@mui/material'

import Header from './components/Header'
import MainPage from './components/MainPage'
import Maps from './components/Maps'

function App() {
  const [showMap, setShowMap] = useState(false);

  const handleHomeClick = () => {
    setShowMap(false);
  };

  const handleMapsClick = () => {
    setShowMap(true);
  };

  return (
    <Box>
      <Header 
        onHomeClick={handleHomeClick} 
        onMapsClick={handleMapsClick}
      />

      {showMap ? (
        <Maps />
      ) : (
        <MainPage onStartClick={handleMapsClick} />
      )}
    </Box>
  )
}

export default App
