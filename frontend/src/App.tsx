import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { CustomCursor } from './components/CustomCursor';
import { HomePage } from './pages/HomePage';
import { AdminPage } from './pages/AdminPage';

export function App() {
  const [isAdminView, setIsAdminView] = useState(() => {
    return window.location.pathname === '/admin' || window.location.hash === '#admin';
  });

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setIsAdminView(true);
      } else if (isAdminView && window.location.hash !== '#admin') {
        setIsAdminView(false);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [isAdminView]);

  const handleAdminClick = () => {
    setIsAdminView(true);
    window.location.hash = '#admin';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToPortfolio = () => {
    setIsAdminView(false);
    window.location.hash = '#home';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white selection:bg-cobalt-600 selection:text-white relative">
      {/* 3D Glowing Custom Cursor */}
      <CustomCursor />

      {isAdminView ? (
        <AdminPage onBackToPortfolio={handleBackToPortfolio} />
      ) : (
        <>
          <Navbar onAdminClick={handleAdminClick} isAdminView={isAdminView} />
          <HomePage onAdminClick={handleAdminClick} />
        </>
      )}
    </div>
  );
}

export default App;
