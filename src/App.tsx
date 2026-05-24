import { useState, useEffect } from 'react'
import Navbar from '@/components/layout/Navbar'
import Landing from '@/pages/Landing'
import Auth from '@/pages/Auth'
import { ThemeProvider } from '@/context/ThemeContext'
import './App.css'

function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash)

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash)
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const renderContent = () => {
    switch (currentHash) {
      case '#auth':
        return <Auth />
      default:
        return <Landing />
    }
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-zinc-50 dark:bg-brand-bg text-zinc-900 dark:text-white flex flex-col font-sans antialiased transition-colors duration-300 selection:bg-brand-green/30 selection:text-brand-green">
        {currentHash !== '#auth' && <Navbar />}
        <main className="flex-grow flex flex-col justify-start items-center">
          {renderContent()}
        </main>
      </div>
    </ThemeProvider>
  )
}

export default App
