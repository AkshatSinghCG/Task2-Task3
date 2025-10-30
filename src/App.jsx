import { useState, useEffect } from 'react'
import './App.css'
import { ProfileProvider } from './context/ProfileContext'
import Profile from './components/Profile'
import ProfileList from './components/ProfileList'

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')

  useEffect(() => {
    document.body.className = `${theme}-theme`;
    localStorage.setItem('theme', theme);
  }, [theme])

  const toggleTheme = () => {
    setTheme(t => t === 'light' ? 'dark' : 'light')
  }

  return (
    <ProfileProvider>
      <div className="theme-toggle">
        <button className="theme-toggle-btn" onClick={toggleTheme} title="Toggle theme">
          <i className={`fas fa-${theme === 'light' ? 'moon' : 'sun'}`}></i>
        </button>
      </div>
      <div className="container">
        <h1>Profile Manager <span className="subtitle">Manage Multiple Profiles</span></h1>
        <div style={{ display: 'flex', gap: 24 }}>
          <ProfileList />
          <Profile />
        </div>
      </div>
    </ProfileProvider>
  )
}

export default App
