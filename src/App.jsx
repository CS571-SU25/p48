import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Header from './components/Header';
import MainPage from './components/MainPage';
import Maps from './components/maps/Maps';
import MyLists from './components/MyLists';

function App() {
  return (
    <BrowserRouter basename="/p0">
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