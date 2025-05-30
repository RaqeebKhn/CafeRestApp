import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import VerticalNavBar from './components/VerticalNavBar'
import Tables from './components/Tables'
import OrderLine from './components/Orderline'

function App() {
  return (
    <Router>
      <div className="app-container">
        <div className="app-layout">
          <VerticalNavBar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Navigate to="/1" replace />} />
              <Route path="/1" element={<Dashboard />} />
              <Route path="/2" element={<Tables />} />
              <Route path="/3" element={<OrderLine />} />
              <Route path="/4" element={<div>Menu Page</div>} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App