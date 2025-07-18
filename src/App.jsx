import React, { useState } from 'react';
import Header from './components/Header';
import MainPage from './components/MainPage';
import Maps from './components/Maps';
import MyLists from './components/MyLists';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handleGoHome = () => setCurrentPage('home');
  const handleGoToMap = () => setCurrentPage('maps');
  const handleGoToLists = () => setCurrentPage('lists');

  const renderPage = () => {
    switch (currentPage) {
      case 'maps':
        return <Maps />;
      case 'lists':
        return <MyLists />;
      case 'home':
      default:
        return <MainPage onStartClick={handleGoToMap} />;
    }
  };

  return (
    <div>
      <Header 
        onHomeClick={handleGoHome} 
        onMapsClick={handleGoToMap}
        onListsClick={handleGoToLists}
      />
      
      {renderPage()}
    </div>
  );
}

export default App;
