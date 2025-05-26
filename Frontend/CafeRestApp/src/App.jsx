import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import VerticalNavBar from './components/VerticalNavBar'

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <div className="app-layout">
          <VerticalNavBar />
          <div className="main-content">
            <Dashboard />
          </div>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App