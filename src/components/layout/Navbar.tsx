import React, { useState } from 'react'
import { Sun, Moon, ArrowRight, Menu, X } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'
import Button from '@/components/common/Button'

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className="w-full bg-transparent border-none transition-all duration-300">
      <div className="w-full px-6 md:px-12 h-20 grid grid-cols-3 items-center">
        
        {/* Left: Logo */}
        <div className="flex justify-start">
          <a href="#" className="flex items-center gap-1.5 text-xl font-bold tracking-tight select-none">
            <span className="text-brand-green font-sans font-extrabold">&#123;&gt;_&#125;</span>
            <span className="font-sans text-zinc-950 dark:text-white">
              Co<span className="text-brand-green">BUILD</span>
            </span>
          </a>
        </div>

        {/* Center: Navigation Links */}
        <div className="hidden md:flex justify-center items-center gap-8">
          <a href="#about" className="text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors duration-200 text-sm font-medium">
            About
          </a>
          <a href="#features" className="text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors duration-200 text-sm font-medium">
            Features
          </a>
          <a href="#how-it-works" className="text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors duration-200 text-sm font-medium">
            How it works
          </a>
          <a href="#pricing" className="text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors duration-200 text-sm font-medium">
            Pricing
          </a>
        </div>

        {/* Right: Actions */}
        <div className="hidden md:flex justify-end items-center gap-6">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900/40 transition-all duration-200 cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </button>

          <a href="#" className="text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors duration-200 text-sm font-medium">
            Log in
          </a>
          <Button variant="outline" size="sm" className="group px-5 py-2">
            Get Started <ArrowRight className="w-4 h-4 text-brand-green-dark dark:text-brand-green group-hover:translate-x-1 group-hover:text-black dark:group-hover:text-black transition-all duration-300" />
          </Button>
        </div>

        {/* Mobile Menu & Theme Button Wrapper (Right) */}
        <div className="flex justify-end items-center gap-4 md:hidden col-start-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
          
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white cursor-pointer"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-white/95 dark:bg-zinc-950/95 border-b border-zinc-200 dark:border-zinc-900 py-6 px-6 flex flex-col gap-5 animate-in fade-in slide-in-from-top duration-300 backdrop-blur-md">
          <a 
            href="#about" 
            onClick={() => setIsOpen(false)}
            className="text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white text-base font-medium"
          >
            About
          </a>
          <a 
            href="#features" 
            onClick={() => setIsOpen(false)}
            className="text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white text-base font-medium"
          >
            Features
          </a>
          <a 
            href="#how-it-works" 
            onClick={() => setIsOpen(false)}
            className="text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white text-base font-medium"
          >
            How it works
          </a>
          <a 
            href="#pricing" 
            onClick={() => setIsOpen(false)}
            className="text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white text-base font-medium"
          >
            Pricing
          </a>
          <div className="h-px bg-zinc-200 dark:bg-zinc-900 my-2"></div>
          <a href="#" className="text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white text-base font-medium">
            Log in
          </a>
          <Button variant="outline" size="md" className="group w-full">
            Get Started <ArrowRight className="w-4 h-4 text-brand-green-dark dark:text-brand-green group-hover:translate-x-1 group-hover:text-black dark:group-hover:text-black transition-all duration-300" />
          </Button>
        </div>
      )}
    </nav>
  )
}

export default Navbar
