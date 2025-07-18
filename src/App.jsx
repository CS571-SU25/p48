import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Header from './components/Header';
import MainPage from './components/MainPage';
import Maps from './components/maps/Maps';
import MyLists from './components/MyLists';

function App() {
  const basename = import.meta.env.BASE_URL;

  return (
    <BrowserRouter basename={basename}>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />

        <Route path="/maps" element={<Maps />} />

        <Route path="/lists" element={<MyLists />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;