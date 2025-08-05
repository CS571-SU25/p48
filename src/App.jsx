import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import MainPage from './components/pages/MainPage';
import Maps from './components/maps/Maps';
import Favorites from './components/pages/Favorites';
import Settings from './components/pages/Settings';
import About from './components/pages/About';

function App() {
  const basename = import.meta.env.BASE_URL;

  return (
    <ThemeProvider>
      <BrowserRouter basename={basename}>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/maps" element={<Maps />} />
          <Route path="/lists" element={<Favorites />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;