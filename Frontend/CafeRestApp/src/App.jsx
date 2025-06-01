import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Dashboard from './components/Dashboard'
import VerticalNavBar from './components/VerticalNavBar'
import Tables from './components/Tables'
import OrderLine from './components/Orderline'
import Menu from './components/Menu'
import Placeorder from './components/Placeorder'

function AppContent() {
  const location = useLocation();
  
  useEffect(() => {
    
    if (location.pathname === '/mobile-menu' || location.pathname === '/place-order') {
      document.body.classList.add('mobile-body-style');
    } else {
      document.body.classList.remove('mobile-body-style');
    }
    
    
    return () => {
      document.body.classList.remove('mobile-body-style');
    };
  }, [location]);
  
  return (
    <Routes>
      
      <Route path="/mobile-menu" element={
        <div className="mobile-viewport">
          <Menu />
        </div>
      } />
      
      <Route path="/place-order" element={
        <div className="mobile-viewport">
          <Placeorder />
        </div>
      } />
      
      <Route path="/*" element={
        <div className="app-container">
          <div className="app-layout">
            <VerticalNavBar />
            <div className="main-content">
              <Routes>
                <Route path="/" element={<Navigate to="/1" replace />} />
                <Route path="/1" element={<Dashboard />} />
                <Route path="/2" element={<Tables />} />
                <Route path="/3" element={<OrderLine />} />
                <Route path="/4" element={<Navigate to="/mobile-menu" replace />} />
              </Routes>
            </div>
          </div>
        </div>
      } />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App