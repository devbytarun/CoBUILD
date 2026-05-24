import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green/50 cursor-pointer'
  
  const variants = {
    primary: 'bg-brand-green text-black hover:bg-[#b2f146] hover:shadow-[0_0_20px_rgba(163,230,53,0.35)]',
    secondary: 'bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700/50',
    outline: 'border border-brand-green-dark/40 dark:border-brand-green/30 text-zinc-900 dark:text-white hover:border-brand-green hover:bg-brand-green hover:text-black dark:hover:text-black rounded-full'
  }
  
  const sizes = {
    sm: 'text-sm px-4 py-1.5 gap-1.5',
    md: 'text-base px-6 py-2.5 gap-2',
    lg: 'text-lg px-8 py-3.5 gap-2.5'
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
