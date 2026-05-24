import { useState } from 'react'
import { ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react'

export const Auth: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(true) // Default to sign up as shown in the image
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const isAcademicEmail = (val: string) => {
    const academicSuffixes = ['.edu', '.ac.uk', '.edu.in', '.edu.co', '.edu.sg', '.ac.in']
    const emailLower = val.toLowerCase()
    return academicSuffixes.some(suffix => emailLower.endsWith(suffix))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')
    setSuccessMsg('')

    if (!email || !password) {
      setErrorMsg('Please fill in all required fields.')
      return
    }

    if (isSignUp) {
      if (!firstName || !lastName) {
        setErrorMsg('Please enter your first and last name.')
        return
      }
      if (!isAcademicEmail(email)) {
        setErrorMsg('CoBUILD requires a valid university email address (.edu or regional equivalent) to sign up.')
        return
      }
      if (password.length < 8) {
        setErrorMsg('Password must be at least 8 characters.')
        return
      }
    }

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      if (isSignUp) {
        setSuccessMsg('Account created successfully! Please verify your university email.')
      } else {
        setSuccessMsg('Signed in successfully!')
        window.location.hash = '' // Redirect to homepage
      }
    }, 1500)
  }

  return (
    <div className="w-full min-h-screen bg-zinc-950 text-white grid grid-cols-1 lg:grid-cols-2 overflow-hidden select-none font-sans">
      
      
      <div 
        className="hidden lg:flex relative flex-col justify-between p-16 overflow-hidden bg-zinc-950 border-r border-zinc-900"
        style={{
          background: 'radial-gradient(circle 550px at 50% -12%, rgba(163, 230, 53, 0.22) 0%, rgba(20, 83, 45, 0.1) 45%, #09090b 90%)'
        }}
      >
        
        
        <div className="relative z-10"></div>

        
        <div className="relative z-10 flex flex-col items-start text-left mt-auto mb-16 max-w-sm">
          
          <h2 className="text-3xl font-extrabold tracking-tight mb-2">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className="text-zinc-400 text-sm mb-9 leading-relaxed">
            {isSignUp 
              ? 'Complete these easy steps to register your student profile and find teams.' 
              : 'Sign in to match with builders, showcase your projects, and collaborate across universities.'}
          </p>

          {isSignUp ? (
            
            <div className="space-y-3.5 w-full text-left">
              
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white text-zinc-950 shadow-lg">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold bg-zinc-950 text-white">
                  1
                </div>
                <span className="text-sm font-semibold">Sign up your account</span>
              </div>

              
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-900/40 border border-zinc-900/80 text-zinc-500">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold bg-zinc-900 text-zinc-600 border border-zinc-800/40">
                  2
                </div>
                <span className="text-sm font-semibold">Verify university email</span>
              </div>

              
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-900/40 border border-zinc-900/80 text-zinc-500">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold bg-zinc-900 text-zinc-600 border border-zinc-800/40">
                  3
                </div>
                <span className="text-sm font-semibold">Set up your builder profile</span>
              </div>
            </div>
          ) : (
            
            <div className="space-y-4 w-full">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-zinc-900/30 border border-zinc-900/80 text-zinc-400">
                <div className="w-6 h-6 rounded-full flex items-center justify-center bg-brand-green/10 text-brand-green text-xs font-bold flex-shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">Match Instantly</h4>
                  <p className="text-xs text-zinc-500 leading-normal">Find and team up with complementary skill sets across university campus networks.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-zinc-900/30 border border-zinc-900/80 text-zinc-400">
                <div className="w-6 h-6 rounded-full flex items-center justify-center bg-brand-green/10 text-brand-green text-xs font-bold flex-shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">Showcase Projects</h4>
                  <p className="text-xs text-zinc-500 leading-normal">Feature your hacks, designs, and systems on a unified student builder portfolio.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        
        <div></div>

      </div>

      
      <div className="col-span-1 lg:col-span-1 flex flex-col justify-center items-center pl-12 pr-6 py-8 sm:p-16 relative bg-zinc-950 z-10">
        
        <div className="w-full max-w-md space-y-8">
          
          
          <div className="relative">
            <a
              href="#"
              className="absolute right-full mr-3.5 top-1.5 text-zinc-400 hover:text-white transition-colors flex items-center justify-center"
              aria-label="Back to home"
            >
              <ArrowLeft className="w-6 h-6" />
            </a>
            <h2 className="text-3xl font-bold tracking-tight">
              {isSignUp ? 'Sign Up Account' : 'Sign In Account'}
            </h2>
            <p className="text-zinc-500 text-sm mt-2">
              {isSignUp ? 'Enter your personal data to create your account.' : 'Enter your credentials to access your account.'}
            </p>
          </div>

          
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => alert('Google auth not configured.')}
              className="flex items-center justify-center gap-2.5 py-3 border border-zinc-800 hover:bg-zinc-900/40 rounded-xl text-xs font-semibold text-zinc-300 transition-all cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
              </svg>
              Google
            </button>
            <button
              onClick={() => alert('GitHub auth not configured.')}
              className="flex items-center justify-center gap-2.5 py-3 border border-zinc-800 hover:bg-zinc-900/40 rounded-xl text-xs font-semibold text-zinc-300 transition-all cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              GitHub
            </button>
          </div>

          
          <div className="flex items-center">
            <div className="flex-grow h-px bg-zinc-900"></div>
            <span className="px-3 text-zinc-500 text-xs font-semibold">Or</span>
            <div className="flex-grow h-px bg-zinc-900"></div>
          </div>

          
          {errorMsg && (
            <div className="flex items-start gap-2.5 p-3.5 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs leading-relaxed">
              <AlertCircle className="w-4.5 h-4.5 flex-shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="flex items-start gap-2.5 p-3.5 bg-brand-green/10 border border-brand-green/20 rounded-xl text-brand-green text-xs leading-relaxed">
              <CheckCircle2 className="w-4.5 h-4.5 flex-shrink-0 mt-0.5" />
              <span>{successMsg}</span>
            </div>
          )}

          
          <form onSubmit={handleSubmit} className="space-y-6">
            {isSignUp && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 text-xs font-semibold mb-2">First Name</label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="eg. John"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-brand-green/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 text-xs font-semibold mb-2">Last Name</label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="eg. Francisco"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-brand-green/50 transition-colors"
                  />
                </div>
              </div>
            )}

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-zinc-400 text-xs font-semibold">Email</label>
                {isSignUp && email && (
                  <span className={`text-[9px] font-bold ${
                    isAcademicEmail(email) ? 'text-brand-green' : 'text-zinc-500'
                  }`}>
                    {isAcademicEmail(email) ? '✓ Academic Verified' : 'Requires .edu email'}
                  </span>
                )}
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="eg. johnfrans@gmail.com"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-brand-green/50 transition-colors"
              />
            </div>

            <div>
              <label className="block text-zinc-400 text-xs font-semibold mb-2">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-brand-green/50 transition-colors"
              />
              {isSignUp && (
                <p className="text-zinc-600 text-[11px] mt-2">Must be at least 8 characters.</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-white hover:bg-zinc-200 text-black font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? 'Processing...' : isSignUp ? 'Sign Up' : 'Sign In'}
            </button>
          </form>

          
          <div className="text-center pt-2">
            <button
              onClick={() => {
                setIsSignUp(!isSignUp)
                setErrorMsg('')
                setSuccessMsg('')
              }}
              className="text-zinc-500 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              {isSignUp ? (
                <span>Already have an account? <strong className="text-white hover:underline">Log in</strong></span>
              ) : (
                <span>Don't have an account? <strong className="text-white hover:underline">Sign up</strong></span>
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Auth

