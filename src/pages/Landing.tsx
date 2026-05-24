import React, { useEffect, useRef } from 'react'
import { ArrowRight, Sparkles, ChevronRight, Users, Brain, HeartHandshake, Trophy, Sliders, Check } from 'lucide-react'
import Button from '@/components/common/Button'
import { useTheme } from '@/context/ThemeContext'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const words = ['teammates.', 'squad.', 'builders.', 'founders.', 'designers.']

export const Landing: React.FC = () => {
  const { theme } = useTheme()
  const [hackathonIndex, setHackathonIndex] = React.useState(0)
  const [roleIndex, setRoleIndex] = React.useState(0)
  const hackathonSlidesCount = 3
  const roleSlidesCount = 3
  const carouselIntervalMs = 4300

  // React state for Hero word rotator
  const [wordIndex, setWordIndex] = React.useState(0)

  // Refs for GSAP animations
  const wordsContainerRef = useRef<HTMLSpanElement>(null)
  
  const buildersRef = useRef<HTMLSpanElement>(null)
  const teamsRef = useRef<HTMLSpanElement>(null)
  const hackathonsRef = useRef<HTMLSpanElement>(null)

  const featuresGridRef = useRef<HTMLDivElement>(null)
  const listingsGridRef = useRef<HTMLDivElement>(null)
  const pricingCardsGridRef = useRef<HTMLDivElement>(null)
  const heroSectionRef = useRef<HTMLDivElement>(null)

  const timelinePathRef = useRef<SVGPathElement>(null)
  const mobileTimelineLineRef = useRef<HTMLDivElement>(null)
  
  const dot1Ref = useRef<HTMLDivElement>(null)
  const dot2Ref = useRef<HTMLDivElement>(null)
  const dot3Ref = useRef<HTMLDivElement>(null)
  const dot4Ref = useRef<HTMLDivElement>(null)
  const dot5Ref = useRef<HTMLDivElement>(null)

  const card1Ref = useRef<HTMLDivElement>(null)
  const card2Ref = useRef<HTMLDivElement>(null)
  const card3Ref = useRef<HTMLDivElement>(null)
  const card4Ref = useRef<HTMLDivElement>(null)
  const card5Ref = useRef<HTMLDivElement>(null)

  // Interval to update the active word
  useEffect(() => {
    const textInterval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length)
    }, 2800)
    return () => clearInterval(textInterval)
  }, [])

  // Auto-loop both carousels together at the same pace
  useEffect(() => {
    const interval = setInterval(() => {
      setHackathonIndex((prev) => (prev + 1) % hackathonSlidesCount)
      setRoleIndex((prev) => (prev + 1) % roleSlidesCount)
    }, carouselIntervalMs)

    return () => clearInterval(interval)
  }, [hackathonSlidesCount, roleSlidesCount, carouselIntervalMs])

  // Animate word scrolling on index update
  useEffect(() => {
    const wordEl = wordsContainerRef.current
    if (!wordEl || !wordEl.parentElement) return

    // Dynamic height of a single text line (parent is inline-block wrap)
    const lineHeight = wordEl.parentElement.clientHeight
    const targetY = -wordIndex * lineHeight

    gsap.to(wordEl, {
      y: targetY,
      duration: 0.5,
      ease: 'back.out(1.3)',
      onStart: () => {
        gsap.to(wordEl, {
          filter: 'blur(1px)',
          duration: 0.15,
          ease: 'power1.out',
        })
      },
      onComplete: () => {
        gsap.to(wordEl, {
          filter: 'blur(0px)',
          duration: 0.15,
          ease: 'power1.in',
        })
      }
    })

    return () => {
      gsap.killTweensOf(wordEl)
    }
  }, [wordIndex])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // --- 1. Page load / reload intro animation ---
      const heroSection = heroSectionRef.current
      if (heroSection) {
        const heroItems = heroSection.querySelectorAll('[data-hero-reveal]')
        const heroCta = heroSection.querySelector('[data-hero-cta]')
        gsap.fromTo(
          heroItems,
          { opacity: 0, y: 26, scale: 0.985 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.12,
          }
        )

        if (heroCta) {
          gsap.fromTo(
            heroCta,
            { opacity: 0, y: 18, scale: 0.92, filter: 'blur(1px)' },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: 'blur(0px)',
              duration: 0.55,
              delay: 0.18,
              ease: 'back.out(1.25)',
            }
          )
        }
      }

      // (Main ScrollTriggers and Counters run once on mount)

      // --- 2. Stats Counters with Blur ---
      const stats = [
        { ref: buildersRef, target: 4230, formatter: (v: number) => Math.floor(v).toLocaleString() },
        { ref: teamsRef, target: 1247, formatter: (v: number) => Math.floor(v).toLocaleString() },
        { ref: hackathonsRef, target: 300, formatter: (v: number) => Math.floor(v).toString() }
      ]

      stats.forEach(({ ref, target, formatter }) => {
        const el = ref.current
        if (!el) return

        const startValue = Math.max(1, Math.floor(target * 0.12))
        const counterObj = { value: startValue }
        el.innerText = formatter(startValue)
        el.style.filter = 'blur(8px)'
        el.style.opacity = '0'

        gsap.to(el, {
          opacity: 1,
          duration: 0.25,
          ease: 'power1.out',
        })

        gsap.to(counterObj, {
          value: target,
          duration: 2.0,
          ease: 'power3.out',
          delay: 0.5,
          onUpdate: function () {
            el.innerText = formatter(counterObj.value)
            const progress = this.progress()
            const currentBlur = (1 - progress) * 8
            el.style.filter = `blur(${currentBlur}px)`
          },
          onComplete: () => {
            el.innerText = formatter(target)
            el.style.filter = 'blur(0px)'
          }
        })
      })

      // --- 3. Features Bento Grid Cards Entrance ---
      const grid = featuresGridRef.current
      if (grid) {
        gsap.fromTo(
          grid.children,
          {
            opacity: 0,
            y: 52,
            scale: 0.97,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            ease: 'power2.out',
            stagger: 0.09,
            scrollTrigger: {
              trigger: grid,
              start: 'top 90%',
              toggleActions: 'play none none none',
            }
          }
        )
      }

      // --- 3b. Section reveal: fade + up on scroll ---
      gsap.fromTo(
        ['#features', '#how-it-works', '#pricing'],
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: '#features',
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      )

      // --- 3c. Listings cards reveal ---
      const listingsGrid = listingsGridRef.current
      if (listingsGrid) {
        gsap.fromTo(
          listingsGrid.children,
          {
            opacity: 0,
            y: 36,
            scale: 0.98,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.0,
            ease: 'power2.out',
            stagger: 0.14,
            scrollTrigger: {
              trigger: listingsGrid,
              start: 'top 86%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      // --- 3d. Pricing cards reveal ---
      const pricingCardsGrid = pricingCardsGridRef.current
      if (pricingCardsGrid) {
        gsap.fromTo(
          pricingCardsGrid.children,
          {
            opacity: 0,
            y: 15,
            scale: 0.985,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.45,
            ease: 'power2.out',
            stagger: 0.05,
            scrollTrigger: {
              trigger: pricingCardsGrid,
              start: 'top 92%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      // --- 4. Desktop Wavy Timeline Animation ---
      const path = timelinePathRef.current
      const dots = [dot1Ref.current, dot2Ref.current, dot3Ref.current, dot4Ref.current, dot5Ref.current]
      const cards = [card1Ref.current, card2Ref.current, card3Ref.current, card4Ref.current, card5Ref.current]

      if (path) {
        const length = path.getTotalLength()
        
        // Initial setup
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        })
        dots.forEach(dot => {
          if (dot) gsap.set(dot, { scale: 0, opacity: 0 })
        })
        cards.forEach(card => {
          if (card) gsap.set(card, { y: 20, opacity: 0 })
        })

        // Build Timeline with ScrollTrigger
        const tl = gsap.timeline({
          delay: 0.4, // Add a delay to let smooth scroll settle
          scrollTrigger: {
            trigger: '#how-it-works',
            start: 'top 75%', // trigger when top of the section is 75% of viewport height
            toggleActions: 'play none none none', // play once
          }
        })

        // Step-by-step path drawing and dot popping
        tl.to(dots[0], { scale: 1, opacity: 1, duration: 0.2 }, 0)
          .to(cards[0], { y: 0, opacity: 1, duration: 0.3 }, 0)
          
          .to(path, { strokeDashoffset: length * 0.77, duration: 0.4, ease: 'power1.inOut' }, 0.1)
          .to(dots[1], { scale: 1, opacity: 1, duration: 0.2 }, 0.5)
          .to(cards[1], { y: 0, opacity: 1, duration: 0.3 }, 0.5)
          
          .to(path, { strokeDashoffset: length * 0.53, duration: 0.4, ease: 'power1.inOut' }, 0.6)
          .to(dots[2], { scale: 1, opacity: 1, duration: 0.2 }, 1.0)
          .to(cards[2], { y: 0, opacity: 1, duration: 0.3 }, 1.0)
          
          .to(path, { strokeDashoffset: length * 0.28, duration: 0.4, ease: 'power1.inOut' }, 1.1)
          .to(dots[3], { scale: 1, opacity: 1, duration: 0.2 }, 1.5)
          .to(cards[3], { y: 0, opacity: 1, duration: 0.3 }, 1.5)
          
          .to(path, { strokeDashoffset: 0, duration: 0.4, ease: 'power1.inOut' }, 1.6)
          .to(dots[4], { scale: 1, opacity: 1, duration: 0.2 }, 2.0)
          .to(cards[4], { y: 0, opacity: 1, duration: 0.3 }, 2.0)
      }

      // --- 5. Mobile Vertical Timeline Line ---
      const mobLine = mobileTimelineLineRef.current
      if (mobLine) {
        gsap.fromTo(
          mobLine,
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: 'top center',
            ease: 'none',
            scrollTrigger: {
              trigger: mobLine.parentElement,
              start: 'top 70%',
              end: 'bottom 80%',
              scrub: 1.2,
            }
          }
        )
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="relative min-h-screen bg-zinc-50 dark:bg-brand-bg text-zinc-900 dark:text-white transition-colors duration-300 overflow-hidden flex flex-col items-center">
      
      {/* Background Grid and Glowing Gradients */}
      <div className="absolute inset-0 grid-overlay pointer-events-none z-0"></div>
      <div className="absolute inset-0 glow-left pointer-events-none z-0"></div>
      <div className="absolute inset-0 glow-right pointer-events-none z-0"></div>

      {/* Hero Section */}
      <div
        id="about"
        ref={heroSectionRef}
        className="w-full max-w-7xl mx-auto px-6 pt-16 md:pt-24 pb-12 flex flex-col items-center text-center z-10"
      >
        
        {/* Badge Pill */}
        <div data-hero-reveal className="inline-flex items-center gap-2 border border-zinc-200 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-950/60 backdrop-blur-sm rounded-full px-4 py-1.5 text-xs font-semibold text-zinc-500 dark:text-zinc-400 tracking-wider shadow-sm transition-all duration-300 hover:border-zinc-300 dark:hover:border-zinc-700">
          <span className="w-2 h-2 rounded-full bg-brand-green shadow-[0_0_8px_#a3e635] animate-pulse"></span>
          JOIN BETA V1
        </div>

        {/* Hero Heading */}
        <h1 data-hero-reveal className="text-4xl md:text-6xl font-extrabold tracking-tight text-zinc-950 dark:text-white mt-8 mb-6 max-w-4xl leading-[1.08] select-none text-center">
          Find your <br className="hidden md:inline" />
          <span className="block h-1 md:h-1.5"></span>
          <span className="text-brand-green-dark dark:text-brand-green inline-flex items-center justify-center font-serif italic font-normal tracking-wide">
            <span className="relative inline-block overflow-hidden h-[1.24em] min-w-[11ch] align-bottom select-none text-center leading-[1.2]">
              {/* Invisible dummy span to set dynamic container width to match current word */}
              <span className="invisible inline-block whitespace-nowrap text-center font-serif italic font-normal tracking-wide">
                {words[wordIndex]}
              </span>
              
              {/* Absolute scrolling container */}
              <span ref={wordsContainerRef} className="absolute left-0 right-0 top-0 flex flex-col whitespace-nowrap text-center leading-[1.2] font-serif italic font-normal tracking-wide">
                {words.map((word, i) => (
                  <span key={i} className="text-center block w-full leading-[1.2]">{word}</span>
                ))}
              </span>
            </span>
          </span>
        </h1>

        {/* Hero Description */}
        <p data-hero-reveal className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-8">
          CoBuild helps students find serious teammates,
          <br className="hidden sm:inline" /> join hackathons, and build winning ideas together.
        </p>

        {/* CTA Button */}
        <Button data-hero-cta variant="primary" size="lg" className="group rounded-xl font-semibold shadow-lg transition-all duration-100">
          Get Started 
          <ArrowRight className="w-5 h-5 text-black group-hover:translate-x-1 transition-transform duration-200" />
        </Button>

        {/* Stats Panel (Compact Capsule size) */}
        <div data-hero-reveal className="w-full max-w-2xl mx-auto mt-16">
          <div className="border border-zinc-200 dark:border-zinc-800/60 bg-white/40 dark:bg-zinc-950/30 backdrop-blur-md rounded-2xl p-5 md:py-6 grid grid-cols-3 gap-0 divide-x divide-zinc-200 dark:divide-zinc-800/60">
            
            {/* Stat 1 */}
            <div className="flex flex-col items-center justify-center px-2">
              <div className="text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-white flex items-center justify-center mb-1">
                <span ref={buildersRef}></span><span className="text-brand-green-dark dark:text-brand-green font-medium pl-0.5">+</span>
              </div>
              <div className="text-[9px] md:text-[10px] font-bold tracking-wider text-zinc-400 dark:text-zinc-500 uppercase text-center">
                Builders
              </div>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center justify-center px-2">
              <div className="text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-white flex items-center justify-center mb-1">
                <span ref={teamsRef}></span><span className="text-brand-green-dark dark:text-brand-green font-medium pl-0.5">+</span>
              </div>
              <div className="text-[9px] md:text-[10px] font-bold tracking-wider text-zinc-400 dark:text-zinc-500 uppercase text-center">
                Open Teams
              </div>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center justify-center px-2">
              <div className="text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-white flex items-center justify-center mb-1">
                <span ref={hackathonsRef}></span><span className="text-brand-green-dark dark:text-brand-green font-medium pl-0.5">+</span>
              </div>
              <div className="text-[9px] md:text-[10px] font-bold tracking-wider text-zinc-400 dark:text-zinc-500 uppercase text-center">
                Hackathons
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Trusted Partners Section (Full Width, Touching Edges) */}
      <div className="w-full border-y border-zinc-200/60 dark:border-zinc-900 bg-zinc-100/30 dark:bg-zinc-950/10 py-8 md:py-10 mt-8 mb-8 md:mb-12 select-none flex flex-col items-center justify-center z-10">
        <p className="text-[11px] md:text-xs font-bold tracking-[0.3em] text-zinc-400 dark:text-zinc-500 uppercase mb-8">
          Trusted by students at
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-1 text-sm md:text-base lg:text-lg font-bold text-zinc-700 dark:text-zinc-300 w-full px-6 max-w-6xl">
          <span>IITs</span>
          <span className="text-zinc-300 dark:text-zinc-800">/</span>
          <span>NITs</span>
          <span className="text-zinc-300 dark:text-zinc-800">/</span>
          <span>BITS Pilani</span>
          <span className="text-zinc-300 dark:text-zinc-800">/</span>
          <span>IIITs</span>
          <span className="text-zinc-300 dark:text-zinc-800">/</span>
          <span>VIT</span>
          <span className="text-zinc-300 dark:text-zinc-800">/</span>
          <span>SRM</span>
          <span className="text-zinc-300 dark:text-zinc-800">/</span>
          <span className="text-brand-green-dark dark:text-brand-green font-extrabold tracking-wide">200+ colleges</span>
        </div>
      </div>

      {/* Features Bento Grid Section */}
      <section id="features" className="w-full max-w-7xl mx-auto px-6 md:px-12 pt-6 md:pt-8 pb-16 md:pb-24 z-10 scroll-mt-2">
        
        {/* Bento Grid layout matching reference 3x3 layout */}
        <div ref={featuresGridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          
          {/* Card 0: Section Title Block (Col 1, Row 1) */}
          <div className="flex flex-col justify-center p-6 text-left">
            <span className="text-brand-green-dark dark:text-brand-green text-xs font-bold tracking-[0.2em] uppercase">Our Platform</span>
            <h2 className="text-3xl md:text-4xl font-normal font-serif text-zinc-950 dark:text-white mt-3 leading-tight">
              Designed for serious building.
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-3.5 max-w-sm leading-relaxed">
              We skip the fluff to connect you directly with skills, matching goals, and hackathon schedules.
            </p>
          </div>

          {/* Card 1: Find Teammates (Col 2, Row 1) */}
          <div className="min-h-[240px] bg-white dark:bg-zinc-900/70 backdrop-blur-md hover:bg-zinc-50 dark:hover:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-700/50 shadow-sm rounded-3xl p-8 transition-all duration-300 hover:shadow-lg hover:border-zinc-300 dark:hover:border-zinc-600/60 flex flex-col justify-between group">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-bold text-zinc-950 dark:text-white group-hover:text-brand-green-dark dark:group-hover:text-brand-green transition-colors">
                Find Teammates
              </h3>
              <Users className="w-6 h-6 text-zinc-400 dark:text-zinc-600 group-hover:text-brand-green-dark dark:group-hover:text-brand-green transition-colors" />
            </div>
            
            <p className="text-zinc-500 dark:text-zinc-400 text-xs md:text-sm mt-6">
              Main selling point. Find serious builders for hackathons. Filter by role, skills, interests, and seriousness.
            </p>
          </div>

          {/* Card 2: Smart Matching (Col 3, Row 1) */}
          <div className="min-h-[240px] bg-white dark:bg-zinc-900/70 backdrop-blur-md hover:bg-zinc-50 dark:hover:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-700/50 shadow-sm rounded-3xl p-8 transition-all duration-300 hover:shadow-lg hover:border-zinc-300 dark:hover:border-zinc-600/60 flex flex-col justify-between group">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-bold text-zinc-950 dark:text-white group-hover:text-brand-green-dark dark:group-hover:text-brand-green transition-colors">
                Smart Matching
              </h3>
              <Brain className="w-6 h-6 text-zinc-400 dark:text-zinc-600 group-hover:text-brand-green-dark dark:group-hover:text-brand-green transition-colors" />
            </div>
            
            <p className="text-zinc-500 dark:text-zinc-400 text-xs md:text-sm mt-6">
              Get teammate recommendations based on skills & goals. Assemble perfect stacks (e.g. Frontend dev + ML dev + UI/UX).
            </p>
          </div>

          {/* Card 3: Team Building (Col 1, Row 2) */}
          <div className="min-h-[240px] bg-white dark:bg-zinc-900/70 backdrop-blur-md hover:bg-zinc-50 dark:hover:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-700/50 shadow-sm rounded-3xl p-8 transition-all duration-300 hover:shadow-lg hover:border-zinc-300 dark:hover:border-zinc-600/60 flex flex-col justify-between group">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-bold text-zinc-950 dark:text-white group-hover:text-brand-green-dark dark:group-hover:text-brand-green transition-colors">
                Team Building
              </h3>
              <Sliders className="w-6 h-6 text-zinc-400 dark:text-zinc-600 group-hover:text-brand-green-dark dark:group-hover:text-brand-green transition-colors" />
            </div>
            
            <p className="text-zinc-500 dark:text-zinc-400 text-xs md:text-sm mt-6">
              Create teams and recruit members. Manage open team status, indicate required roles, and invite builders.
            </p>
          </div>

          {/* Card 4: Join Hackathons (Col 2, Row 2) */}
          <div className="min-h-[240px] bg-white dark:bg-zinc-900/70 backdrop-blur-md hover:bg-zinc-50 dark:hover:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-700/50 shadow-sm rounded-3xl p-8 transition-all duration-300 hover:shadow-lg hover:border-zinc-300 dark:hover:border-zinc-600/60 flex flex-col justify-between group">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-bold text-zinc-950 dark:text-white group-hover:text-brand-green-dark dark:group-hover:text-brand-green transition-colors">
                Join Hackathons
              </h3>
              <Trophy className="w-6 h-6 text-zinc-400 dark:text-zinc-600 group-hover:text-brand-green-dark dark:group-hover:text-brand-green transition-colors" />
            </div>
            
            <p className="text-zinc-500 dark:text-zinc-400 text-xs md:text-sm mt-6">
              Explore relevant hackathons. Simple listing dashboard containing deadlines, prizes, online/offline status, and apply links.
            </p>
          </div>

          {/* Card 5: Compatibility Score (Col 3, Row 2) */}
          <div className="min-h-[240px] bg-white dark:bg-zinc-900/70 backdrop-blur-md hover:bg-zinc-50 dark:hover:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-700/50 shadow-sm rounded-3xl p-8 transition-all duration-300 hover:shadow-lg hover:border-zinc-600/60 flex flex-col justify-between group">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-bold text-zinc-950 dark:text-white group-hover:text-brand-green-dark dark:group-hover:text-brand-green transition-colors">
                Compatibility Score
              </h3>
              <HeartHandshake className="w-6 h-6 text-zinc-400 dark:text-zinc-600 group-hover:text-brand-green-dark dark:group-hover:text-brand-green transition-colors" />
            </div>
            
            <p className="text-zinc-500 dark:text-zinc-400 text-xs md:text-sm mt-6">
              Know if teammates actually fit. Smart score metrics calculated based on skill complements, interests, and seriousness.
            </p>
          </div>

          {/* Card 6: Explore Subscription (Row 3, Spans all columns - Solid green banner style) */}
          <div id="subscription-banner" className="md:col-span-3 bg-[#a3e635] text-black rounded-3xl p-8 transition-all duration-300 hover:shadow-[0_0_30px_rgba(163,230,53,0.25)] flex flex-col md:flex-row justify-between items-center group cursor-pointer relative overflow-hidden select-none mt-4">
            
            {/* Dollar sign pattern (Full outlined scattered dollars in bg) */}
            <div 
              className="absolute inset-0 select-none pointer-events-none overflow-hidden z-0 transition-transform duration-500 ease-out scale-100 group-hover:scale-125"
              style={{ transformOrigin: 'center center' }}
            >
              {[
                { left: '4%', top: '-8%', size: 'text-2xl md:text-3xl', rotate: '-rotate-12' },
                { left: '16%', top: '22%', size: 'text-2xl md:text-3xl', rotate: 'rotate-12' },
                { left: '8%', top: '55%', size: 'text-3xl md:text-4xl', rotate: '-rotate-45' },
                { left: '3%', top: '82%', size: 'text-2xl md:text-3xl', rotate: 'rotate-6' },
                { left: '28%', top: '10%', size: 'text-4xl md:text-5xl', rotate: 'rotate-45' },
                { left: '34%', top: '48%', size: 'text-2xl md:text-3xl', rotate: '-rotate-12' },
                { left: '24%', top: '78%', size: 'text-3xl md:text-4xl', rotate: 'rotate-12' },
                { left: '48%', top: '18%', size: 'text-3xl md:text-4xl', rotate: '-rotate-12' },
                { left: '56%', top: '52%', size: 'text-4xl md:text-5xl', rotate: 'rotate-45' },
                { left: '44%', top: '80%', size: 'text-2xl md:text-3xl', rotate: '-rotate-6' },
                { left: '68%', top: '12%', size: 'text-2xl md:text-3xl', rotate: 'rotate-12' },
                { left: '76%', top: '42%', size: 'text-3xl md:text-4xl', rotate: '-rotate-12' },
                { left: '66%', top: '76%', size: 'text-4xl md:text-5xl', rotate: 'rotate-12' },
                { left: '88%', top: '16%', size: 'text-3xl md:text-4xl', rotate: '-rotate-45' },
                { left: '94%', top: '48%', size: 'text-2xl md:text-3xl', rotate: 'rotate-6' },
                { left: '86%', top: '82%', size: 'text-4xl md:text-5xl', rotate: '-rotate-12' },
              ].map((d, idx) => (
                <span
                  key={idx}
                  className={`absolute font-mono font-black ${d.size} ${d.rotate}`}
                  style={{
                    left: d.left,
                    top: d.top,
                    WebkitTextStroke: '1.5px rgba(0, 0, 0, 0.16)',
                    color: 'transparent',
                  }}
                >
                  $
                </span>
              ))}
            </div>
            
            <div className="z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="p-3 bg-black/10 rounded-xl text-black">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-black uppercase tracking-tight">
                  Explore Subscription
                </h3>
                <p className="text-black/75 text-xs md:text-sm mt-1.5 font-bold max-w-2xl">
                  Unlock premium features like direct messaging to elite builders, priority matchmaking, unlimited hackathon team entries, and exclusive profile highlights.
                </p>
              </div>
            </div>

            {/* CTA Arrow Link */}
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-black mt-6 md:mt-0 z-10 shrink-0 border-b-2 border-black pb-0.5">
              <span>Explore Subscription</span>
              <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>

      </section>


      {/* Process Section (Wavy Path & Left Header - Reference Image 5) */}
      <section id="how-it-works" className="w-full max-w-7xl mx-auto px-6 md:px-12 pt-2 pb-0 z-10 scroll-mt-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Heading and CTA */}
          <div className="lg:col-span-4 flex flex-col items-start text-left mt-8">
            <span className="text-brand-green-dark dark:text-brand-green text-xs font-bold tracking-[0.2em] uppercase">Workflow</span>
            <h2 className="text-3xl md:text-4xl font-normal font-serif text-zinc-950 dark:text-white mt-3 leading-tight">
              We have best team and best process
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-4 leading-relaxed max-w-sm">
              CoBuild streamlines team formation. Create your builder profile, match goals, build a team, and apply to hackathons together in a simplified V1 flow.
            </p>
            <Button variant="primary" size="md" className="mt-8 rounded-full font-bold shadow-md">
              Get Started
            </Button>
          </div>

          {/* Right Column: Wavy Timeline (Responsive) */}
          <div className="lg:col-span-8 w-full relative min-h-[320px] overflow-x-auto md:overflow-x-visible">
            
            {/* Desktop Horizontal Wavy Timeline */}
            <div className="hidden md:block w-[1000px] lg:w-full h-[300px] relative">
              
              {/* Curved SVG Wave Line (Shifted up by 20px) */}
              <svg className="absolute w-full h-[320px] top-0 left-0" viewBox="0 0 1000 320" fill="none" preserveAspectRatio="none">
                <path 
                  d="M 50 280 C 90 270, 120 240, 150 240 C 220 240, 280 160, 350 160 C 420 160, 480 80, 550 80 C 620 80, 680 160, 750 160 C 820 160, 880 120, 920 120" 
                  className="stroke-zinc-200 dark:stroke-zinc-900" 
                  strokeWidth="4" 
                  strokeDasharray="6 6"
                />
                <path 
                  ref={timelinePathRef}
                  d="M 50 280 C 90 270, 120 240, 150 240 C 220 240, 280 160, 350 160 C 420 160, 480 80, 550 80 C 620 80, 680 160, 750 160 C 820 160, 880 120, 920 120" 
                  className="stroke-brand-green" 
                  strokeWidth="4" 
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ filter: 'drop-shadow(0 0 4px rgba(163, 230, 53, 0.3))' }}
                />
              </svg>

              {/* Node 1: Create Profile */}
              <div ref={dot1Ref} className="absolute left-[15%] top-[240px] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto">
                <div className="w-5 h-5 rounded-full border-4 border-brand-green bg-white dark:bg-zinc-950 shadow-sm flex items-center justify-center transition-transform duration-300 hover:scale-125">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-green"></div>
                </div>
              </div>
              <div ref={card1Ref} className="absolute left-[15%] bottom-[130px] -translate-x-1/2 w-[200px] text-center select-none pointer-events-auto z-10">
                <span 
                  className="text-7xl md:text-8xl font-black text-transparent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 select-none font-sans tracking-tighter leading-none"
                  style={{ WebkitTextStroke: theme === 'dark' ? '1.5px rgba(163, 230, 53, 0.15)' : '1.5px rgba(163, 230, 53, 0.3)' }}
                >
                  1
                </span>
                <h4 className="font-bold text-xs md:text-sm text-zinc-900 dark:text-white relative z-10">Create Profile</h4>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed relative z-10 mx-auto max-w-[160px]">
                  Complete your builder profile (role, skills, interests, bio).
                </p>
              </div>

              {/* Node 2: Match */}
              <div ref={dot2Ref} className="absolute left-[35%] top-[160px] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto">
                <div className="w-5 h-5 rounded-full border-4 border-brand-green bg-white dark:bg-zinc-950 shadow-sm flex items-center justify-center transition-transform duration-300 hover:scale-125">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-green"></div>
                </div>
              </div>
              <div ref={card2Ref} className="absolute left-[35%] top-[200px] -translate-x-1/2 w-[200px] text-center select-none pointer-events-auto z-10">
                <span 
                  className="text-7xl md:text-8xl font-black text-transparent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 select-none font-sans tracking-tighter leading-none"
                  style={{ WebkitTextStroke: theme === 'dark' ? '1.5px rgba(163, 230, 53, 0.15)' : '1.5px rgba(163, 230, 53, 0.3)' }}
                >
                  2
                </span>
                <h4 className="font-bold text-xs md:text-sm text-zinc-900 dark:text-white relative z-10">Match</h4>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed relative z-10 mx-auto max-w-[160px]">
                  Choose goal. View recommended builders or teams.
                </p>
              </div>

              {/* Node 3: Form Team */}
              <div ref={dot3Ref} className="absolute left-[55%] top-[80px] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto">
                <div className="w-5 h-5 rounded-full border-4 border-brand-green bg-white dark:bg-zinc-950 shadow-sm flex items-center justify-center transition-transform duration-300 hover:scale-125">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-green"></div>
                </div>
              </div>
              <div ref={card3Ref} className="absolute left-[55%] top-[120px] -translate-x-1/2 w-[200px] text-center select-none pointer-events-auto z-10">
                <span 
                  className="text-7xl md:text-8xl font-black text-transparent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 select-none font-sans tracking-tighter leading-none"
                  style={{ WebkitTextStroke: theme === 'dark' ? '1.5px rgba(163, 230, 53, 0.15)' : '1.5px rgba(163, 230, 53, 0.3)' }}
                >
                  3
                </span>
                <h4 className="font-bold text-xs md:text-sm text-zinc-900 dark:text-white relative z-10">Form Team</h4>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed relative z-10 mx-auto max-w-[160px]">
                  Send requests or invite members. Accept to join.
                </p>
              </div>

              {/* Node 4: Join Hackathon */}
              <div ref={dot4Ref} className="absolute left-[75%] top-[160px] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto">
                <div className="w-5 h-5 rounded-full border-4 border-brand-green bg-white dark:bg-zinc-950 shadow-sm flex items-center justify-center transition-transform duration-300 hover:scale-125">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-green"></div>
                </div>
              </div>
              <div ref={card4Ref} className="absolute left-[75%] top-[200px] -translate-x-1/2 w-[200px] text-center select-none pointer-events-auto z-10">
                <span 
                  className="text-7xl md:text-8xl font-black text-transparent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 select-none font-sans tracking-tighter leading-none"
                  style={{ WebkitTextStroke: theme === 'dark' ? '1.5px rgba(163, 230, 53, 0.15)' : '1.5px rgba(163, 230, 53, 0.3)' }}
                >
                  4
                </span>
                <h4 className="font-bold text-xs md:text-sm text-zinc-900 dark:text-white relative z-10">Join Hackathon</h4>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed relative z-10 mx-auto max-w-[160px]">
                  Explore and apply to relevant hackathons.
                </p>
              </div>

              {/* Node 5: Build Together */}
              <div ref={dot5Ref} className="absolute left-[92%] top-[120px] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto">
                <div className="w-5 h-5 rounded-full border-4 border-brand-green bg-white dark:bg-zinc-950 shadow-sm flex items-center justify-center transition-transform duration-300 hover:scale-125">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-green"></div>
                </div>
              </div>
              <div ref={card5Ref} className="absolute left-[92%] top-[160px] -translate-x-1/2 w-[200px] text-center select-none pointer-events-auto z-10">
                <span 
                  className="text-7xl md:text-8xl font-black text-transparent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 select-none font-sans tracking-tighter leading-none"
                  style={{ WebkitTextStroke: theme === 'dark' ? '1.5px rgba(163, 230, 53, 0.15)' : '1.5px rgba(163, 230, 53, 0.3)' }}
                >
                  5
                </span>
                <h4 className="font-bold text-xs md:text-sm text-zinc-900 dark:text-white relative z-10">Build Together</h4>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed relative z-10 mx-auto max-w-[160px]">
                  Ship code, submit project, and win together.
                </p>
              </div>

            </div>

            {/* Mobile Vertical Timeline */}
            <div className="block md:hidden pl-8 relative text-left">
              <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-zinc-200 dark:bg-zinc-800"></div>
              <div ref={mobileTimelineLineRef} className="absolute left-4 top-2 bottom-2 w-0.5 bg-brand-green" style={{ height: '90%' }}></div>
              
              <div className="flex flex-col gap-10">
                {/* Mob Step 1 */}
                <div className="relative pl-6">
                  <div className="absolute -left-4 top-1.5 w-3 h-3 rounded-full border-2 border-brand-green bg-white dark:bg-zinc-950 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-brand-green"></div>
                  </div>
                  <span 
                    className="text-6xl font-black text-transparent absolute -top-4 right-4 -z-10 select-none font-sans tracking-tighter leading-none"
                    style={{ WebkitTextStroke: theme === 'dark' ? '1.5px rgba(163, 230, 53, 0.15)' : '1.5px rgba(163, 230, 53, 0.3)' }}
                  >
                    1
                  </span>
                  <h4 className="font-bold text-sm text-zinc-950 dark:text-white relative z-10">Create Profile</h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed max-w-sm relative z-10">
                    Complete your builder profile with role, skills, interests, and bio.
                  </p>
                </div>
                
                {/* Mob Step 2 */}
                <div className="relative pl-6">
                  <div className="absolute -left-4 top-1.5 w-3 h-3 rounded-full border-2 border-brand-green bg-white dark:bg-zinc-950 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-brand-green"></div>
                  </div>
                  <span 
                    className="text-6xl font-black text-transparent absolute -top-4 right-4 -z-10 select-none font-sans tracking-tighter leading-none"
                    style={{ WebkitTextStroke: theme === 'dark' ? '1.5px rgba(163, 230, 53, 0.15)' : '1.5px rgba(163, 230, 53, 0.3)' }}
                  >
                    2
                  </span>
                  <h4 className="font-bold text-sm text-zinc-950 dark:text-white relative z-10">Match</h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed max-w-sm relative z-10">
                    Choose goal. View recommended builders or teams based on goals.
                  </p>
                </div>

                {/* Mob Step 3 */}
                <div className="relative pl-6">
                  <div className="absolute -left-4 top-1.5 w-3 h-3 rounded-full border-2 border-brand-green bg-white dark:bg-zinc-950 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-brand-green"></div>
                  </div>
                  <span 
                    className="text-6xl font-black text-transparent absolute -top-4 right-4 -z-10 select-none font-sans tracking-tighter leading-none"
                    style={{ WebkitTextStroke: theme === 'dark' ? '1.5px rgba(163, 230, 53, 0.15)' : '1.5px rgba(163, 230, 53, 0.3)' }}
                  >
                    3
                  </span>
                  <h4 className="font-bold text-sm text-zinc-950 dark:text-white relative z-10">Form Team</h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed max-w-sm relative z-10">
                    Send requests or invite members. Accept to form your core team.
                  </p>
                </div>

                {/* Mob Step 4 */}
                <div className="relative pl-6">
                  <div className="absolute -left-4 top-1.5 w-3 h-3 rounded-full border-2 border-brand-green bg-white dark:bg-zinc-950 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-brand-green"></div>
                  </div>
                  <span 
                    className="text-6xl font-black text-transparent absolute -top-4 right-4 -z-10 select-none font-sans tracking-tighter leading-none"
                    style={{ WebkitTextStroke: theme === 'dark' ? '1.5px rgba(163, 230, 53, 0.15)' : '1.5px rgba(163, 230, 53, 0.3)' }}
                  >
                    4
                  </span>
                  <h4 className="font-bold text-sm text-zinc-950 dark:text-white relative z-10">Join Hackathon</h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed max-w-sm relative z-10">
                    Explore hackathons, check prizes/deadlines, and apply directly.
                  </p>
                </div>

                {/* Mob Step 5 */}
                <div className="relative pl-6">
                  <div className="absolute -left-4 top-1.5 w-3 h-3 rounded-full border-2 border-brand-green bg-white dark:bg-zinc-950 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-brand-green"></div>
                  </div>
                  <span 
                    className="text-6xl font-black text-transparent absolute -top-4 right-4 -z-10 select-none font-sans tracking-tighter leading-none"
                    style={{ WebkitTextStroke: theme === 'dark' ? '1.5px rgba(163, 230, 53, 0.15)' : '1.5px rgba(163, 230, 53, 0.3)' }}
                  >
                    5
                  </span>
                  <h4 className="font-bold text-sm text-zinc-950 dark:text-white relative z-10">Build Together</h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed max-w-sm relative z-10">
                    Collaborate with teammates, submit project, and win together.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Listings Dashboard Section */}
      <section id="listings" className="w-full max-w-7xl mx-auto px-6 md:px-12 pt-28 md:pt-40 pb-16 md:pb-24 z-10">
        <div ref={listingsGridRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Column: Hackathons Listing */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2.5 h-2.5 rounded-full bg-brand-green shadow-[0_0_8px_#a3e635]"></div>
              <h3 className="text-xl font-normal font-serif text-zinc-950 dark:text-white">Active Hackathons</h3>
            </div>
            
            <div className="relative group/carousel w-full">
              {/* Carousel card container with overlay right arrow and inner padding (pl-6 pr-10) */}
              <div className="relative overflow-hidden border border-zinc-200/60 dark:border-zinc-900/60 bg-zinc-50/50 dark:bg-zinc-950/20 backdrop-blur-sm rounded-2xl py-6 pl-6 pr-10 hover:border-brand-green/30 dark:hover:border-brand-green/20 transition-all duration-300 min-h-[190px] flex flex-col justify-between group">
                
                {/* Navigation Button - absolutely overlaid on the right edge */}
                <button
                  onClick={() => setHackathonIndex((prev) => (prev + 1) % hackathonSlidesCount)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/90 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800/80 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-200 opacity-100 md:opacity-0 md:group-hover:opacity-100 focus:opacity-100 z-20 cursor-pointer shadow-sm"
                  aria-label="Next Hackathon"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Card content with animation key to trigger fadeIn on index change */}
                <div key={hackathonIndex} className="w-full animate-fade-in flex flex-col justify-between h-full flex-grow">
                  {hackathonIndex === 0 && (
                    <>
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <span className="text-[10px] font-bold text-brand-green-dark dark:text-brand-green bg-brand-green/10 px-2 py-0.5 rounded">AI CHALLENGE</span>
                          <h4 className="font-extrabold text-sm md:text-base text-zinc-900 dark:text-white mt-2 group-hover:text-brand-green-dark dark:group-hover:text-brand-green transition-colors">AI Innovation Summit</h4>
                          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">Organized by Google Cloud • Online</p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500 block">PRIZE POOL</span>
                          <span className="text-base md:text-lg font-black text-brand-green-dark dark:text-brand-green">$50,000</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center border-t border-zinc-200/50 dark:border-zinc-900/50 mt-4 pt-3 text-[11px]">
                        <span className="text-zinc-500 dark:text-zinc-400 font-medium">Starts: <strong className="text-zinc-900 dark:text-zinc-300">June 5, 2026</strong></span>
                        <a href="#" className="flex items-center gap-1 font-bold text-zinc-900 dark:text-white hover:text-brand-green-dark dark:hover:text-brand-green transition-colors">
                          Find Teammates <ArrowRight className="w-3.5 h-3.5 text-zinc-900 dark:text-white group-hover:translate-x-0.5 transition-transform" />
                        </a>
                      </div>
                    </>
                  )}

                  {hackathonIndex === 1 && (
                    <>
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <span className="text-[10px] font-bold text-brand-green-dark dark:text-brand-green bg-brand-green/10 px-2 py-0.5 rounded">WEB3 GLOBAL</span>
                          <h4 className="font-extrabold text-sm md:text-base text-zinc-900 dark:text-white mt-2 group-hover:text-brand-green-dark dark:group-hover:text-brand-green transition-colors">ETHGlobal Buildathon</h4>
                          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">Organized by Devfolio • Hybrid (Bangalore)</p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500 block">PRIZE POOL</span>
                          <span className="text-base md:text-lg font-black text-brand-green-dark dark:text-brand-green">$100,000</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center border-t border-zinc-200/50 dark:border-zinc-900/50 mt-4 pt-3 text-[11px]">
                        <span className="text-zinc-500 dark:text-zinc-400 font-medium">Starts: <strong className="text-zinc-900 dark:text-zinc-300">June 18, 2026</strong></span>
                        <a href="#" className="flex items-center gap-1 font-bold text-zinc-900 dark:text-white hover:text-brand-green-dark dark:hover:text-brand-green transition-colors">
                          Find Teammates <ArrowRight className="w-3.5 h-3.5 text-zinc-900 dark:text-white group-hover:translate-x-0.5 transition-transform" />
                        </a>
                      </div>
                    </>
                  )}

                  {hackathonIndex === 2 && (
                    <>
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <span className="text-[10px] font-bold text-brand-green-dark dark:text-brand-green bg-brand-green/10 px-2 py-0.5 rounded">DESIGN & BUILD</span>
                          <h4 className="font-extrabold text-sm md:text-base text-zinc-900 dark:text-white mt-2 group-hover:text-brand-green-dark dark:group-hover:text-brand-green transition-colors">Vite + React Hackfest</h4>
                          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">Organized by Vercel • Online</p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500 block">PRIZE POOL</span>
                          <span className="text-base md:text-lg font-black text-brand-green-dark dark:text-brand-green">$15,000</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center border-t border-zinc-200/50 dark:border-zinc-900/50 mt-4 pt-3 text-[11px]">
                        <span className="text-zinc-500 dark:text-zinc-400 font-medium">Starts: <strong className="text-zinc-900 dark:text-zinc-300">July 2, 2026</strong></span>
                        <a href="#" className="flex items-center gap-1 font-bold text-zinc-900 dark:text-white hover:text-brand-green-dark dark:hover:text-brand-green transition-colors">
                          Find Teammates <ArrowRight className="w-3.5 h-3.5 text-zinc-900 dark:text-white group-hover:translate-x-0.5 transition-transform" />
                        </a>
                      </div>
                    </>
                  )}
                </div>

              </div>

              {/* Indicator dots at bottom center */}
              <div className="flex justify-center items-center gap-1.5 mt-4">
                {[0, 1, 2].map((idx) => (
                  <button
                    key={idx}
                    onClick={() => setHackathonIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      hackathonIndex === idx 
                        ? 'w-6 bg-brand-green-dark dark:bg-brand-green' 
                        : 'w-1.5 bg-zinc-300 dark:bg-zinc-800 hover:bg-zinc-400 dark:hover:bg-zinc-700'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

            </div>
          </div>

          {/* Right Column: Roles Listing */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2.5 h-2.5 rounded-full bg-brand-green shadow-[0_0_8px_#a3e635]"></div>
              <h3 className="text-xl font-normal font-serif text-zinc-950 dark:text-white">Open Builder Roles</h3>
            </div>
            
            <div className="relative group/carousel w-full">
              {/* Carousel card container with overlay right arrow and inner padding (pl-6 pr-10) */}
              <div className="relative overflow-hidden border border-zinc-200/60 dark:border-zinc-900/60 bg-zinc-50/50 dark:bg-zinc-950/20 backdrop-blur-sm rounded-2xl py-6 pl-6 pr-10 hover:border-brand-green/30 dark:hover:border-brand-green/20 transition-all duration-300 min-h-[190px] flex flex-col justify-between group">
                
                {/* Navigation Button - absolutely overlaid on the right edge */}
                <button
                  onClick={() => setRoleIndex((prev) => (prev + 1) % roleSlidesCount)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/90 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800/80 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-200 opacity-100 md:opacity-0 md:group-hover:opacity-100 focus:opacity-100 z-20 cursor-pointer shadow-sm"
                  aria-label="Next Role"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Card content with animation key to trigger fadeIn on index change */}
                <div key={roleIndex} className="w-full animate-fade-in flex flex-col justify-between h-full flex-grow">
                  {roleIndex === 0 && (
                    <>
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-bold text-white bg-zinc-900 dark:bg-zinc-800 px-2 py-0.5 rounded">FRONTEND</span>
                            <span className="text-[9px] font-bold text-brand-green-dark dark:text-brand-green border border-brand-green/30 px-1.5 py-0.2 rounded uppercase">96% Match</span>
                          </div>
                          <h4 className="font-extrabold text-sm md:text-base text-zinc-900 dark:text-white mt-2 group-hover:text-brand-green-dark dark:group-hover:text-brand-green transition-colors">Frontend UI Developer</h4>
                          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">Team Nexus • Building AI Agent workflow UI</p>
                        </div>
                        <span className="text-[9px] font-bold tracking-wider text-zinc-400 dark:text-zinc-500 border border-zinc-200 dark:border-zinc-800 rounded px-2 py-1 uppercase shrink-0">
                          3/4 joined
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        <span className="text-[9px] bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 px-2 py-0.5 rounded font-mono">React</span>
                        <span className="text-[9px] bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 px-2 py-0.5 rounded font-mono">TailwindCSS</span>
                        <span className="text-[9px] bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 px-2 py-0.5 rounded font-mono">Framer Motion</span>
                      </div>
                      <div className="flex justify-between items-center border-t border-zinc-200/50 dark:border-zinc-900/50 mt-4 pt-3 text-[11px]">
                        <span className="text-zinc-500 dark:text-zinc-400 font-medium">Seriousness: <strong className="text-brand-green-dark dark:text-brand-green font-bold">Elite</strong></span>
                        <a href="#" className="flex items-center gap-1 font-bold text-zinc-900 dark:text-white hover:text-brand-green-dark dark:hover:text-brand-green transition-colors">
                          Request to Join <ArrowRight className="w-3.5 h-3.5 text-zinc-900 dark:text-white group-hover:translate-x-0.5 transition-transform" />
                        </a>
                      </div>
                    </>
                  )}

                  {roleIndex === 1 && (
                    <>
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-bold text-white bg-zinc-900 dark:bg-zinc-800 px-2 py-0.5 rounded">ML / DATA</span>
                            <span className="text-[9px] font-bold text-brand-green-dark dark:text-brand-green border border-brand-green/30 px-1.5 py-0.2 rounded uppercase">91% Match</span>
                          </div>
                          <h4 className="font-extrabold text-sm md:text-base text-zinc-900 dark:text-white mt-2 group-hover:text-brand-green-dark dark:group-hover:text-brand-green transition-colors">PyTorch / Fine-Tuning Eng</h4>
                          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">Team Alpha • Fine-tuning LLM on medical data</p>
                        </div>
                        <span className="text-[9px] font-bold tracking-wider text-zinc-400 dark:text-zinc-500 border border-zinc-200 dark:border-zinc-800 rounded px-2 py-1 uppercase shrink-0">
                          2/4 joined
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        <span className="text-[9px] bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 px-2 py-0.5 rounded font-mono">PyTorch</span>
                        <span className="text-[9px] bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 px-2 py-0.5 rounded font-mono">HuggingFace</span>
                        <span className="text-[9px] bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 px-2 py-0.5 rounded font-mono">Python</span>
                      </div>
                      <div className="flex justify-between items-center border-t border-zinc-200/50 dark:border-zinc-900/50 mt-4 pt-3 text-[11px]">
                        <span className="text-zinc-500 dark:text-zinc-400 font-medium">Seriousness: <strong className="text-brand-green-dark dark:text-brand-green font-bold">Elite</strong></span>
                        <a href="#" className="flex items-center gap-1 font-bold text-zinc-900 dark:text-white hover:text-brand-green-dark dark:hover:text-brand-green transition-colors">
                          Request to Join <ArrowRight className="w-3.5 h-3.5 text-zinc-900 dark:text-white group-hover:translate-x-0.5 transition-transform" />
                        </a>
                      </div>
                    </>
                  )}

                  {roleIndex === 2 && (
                    <>
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-bold text-white bg-zinc-900 dark:bg-zinc-800 px-2 py-0.5 rounded">DESIGN</span>
                            <span className="text-[9px] font-bold text-brand-green-dark dark:text-brand-green border border-brand-green/30 px-1.5 py-0.2 rounded uppercase">88% Match</span>
                          </div>
                          <h4 className="font-extrabold text-sm md:text-base text-zinc-900 dark:text-white mt-2 group-hover:text-brand-green-dark dark:group-hover:text-brand-green transition-colors">UI/UX Designer</h4>
                          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">Team Delta • Designing FinTech landing page</p>
                        </div>
                        <span className="text-[9px] font-bold tracking-wider text-zinc-400 dark:text-zinc-500 border border-zinc-200 dark:border-zinc-800 rounded px-2 py-1 uppercase shrink-0">
                          1/3 joined
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        <span className="text-[9px] bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 px-2 py-0.5 rounded font-mono">Figma</span>
                        <span className="text-[9px] bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 px-2 py-0.5 rounded font-mono">Prototyping</span>
                        <span className="text-[9px] bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 px-2 py-0.5 rounded font-mono">React Basic</span>
                      </div>
                      <div className="flex justify-between items-center border-t border-zinc-200/50 dark:border-zinc-900/50 mt-4 pt-3 text-[11px]">
                        <span className="text-zinc-500 dark:text-zinc-400 font-medium">Seriousness: <strong className="text-zinc-900 dark:text-zinc-400 font-bold">Standard</strong></span>
                        <a href="#" className="flex items-center gap-1 font-bold text-zinc-900 dark:text-white hover:text-brand-green-dark dark:hover:text-brand-green transition-colors">
                          Request to Join <ArrowRight className="w-3.5 h-3.5 text-zinc-900 dark:text-white group-hover:translate-x-0.5 transition-transform" />
                        </a>
                      </div>
                    </>
                  )}
                </div>

              </div>

              {/* Indicator dots at bottom center */}
              <div className="flex justify-center items-center gap-1.5 mt-4">
                {[0, 1, 2].map((idx) => (
                  <button
                    key={idx}
                    onClick={() => setRoleIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      roleIndex === idx 
                        ? 'w-6 bg-brand-green-dark dark:bg-brand-green' 
                        : 'w-1.5 bg-zinc-300 dark:bg-zinc-800 hover:bg-zinc-400 dark:hover:bg-zinc-700'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* V1/V2 Cards Section */}
      <section id="pricing" className="w-full max-w-7xl mx-auto px-6 md:px-12 pt-8 md:pt-10 pb-20 md:pb-28 z-10 scroll-mt-4">
        
        {/* Section Header styled exactly like reference image 2 */}
        <div className="mb-8 md:mb-10 text-center flex flex-col items-center select-none">
          <span className="text-zinc-400 dark:text-zinc-500 text-xs font-semibold tracking-[0.2em] uppercase mb-3">Pricing</span>
          <h2 className="text-4xl md:text-5xl font-normal font-serif text-zinc-950 dark:text-white mt-1 leading-tight">
            Flexible plans. Scalable growth.
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base mt-4 max-w-2xl text-center leading-relaxed">
            From launch to scale, we've got you covered at every stage.
          </p>
        </div>

        {/* Cards Grid styled like reference image 2 */}
        <div ref={pricingCardsGridRef} className="grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-32 max-w-6xl mx-auto items-stretch">
          
          {/* Card 1: Starter */}
          <div className="relative rounded-[28px] border-2 border-zinc-200 dark:border-zinc-900 bg-white dark:bg-[#0c0c0e]/80 backdrop-blur-md p-6 md:p-7 flex flex-col gap-5 shadow-sm hover:shadow-[0_20px_40px_rgba(163,230,53,0.08)] dark:hover:shadow-[0_20px_40px_rgba(163,230,53,0.18)] hover:-translate-y-1.5 hover:border-brand-green dark:hover:border-brand-green transition-all duration-300 group">
            
            <div className="flex flex-col">
              <h3 className="text-xl font-semibold font-sans tracking-tight text-zinc-900 dark:text-white">Starter</h3>
              
              <div className="flex items-baseline mt-3 mb-1">
                <span className="text-3xl md:text-4xl font-extrabold font-sans tracking-tight text-zinc-950 dark:text-white">₹0</span>
                <span className="text-xs text-zinc-400 dark:text-zinc-500 ml-1.5 font-medium">/month</span>
              </div>
              
              <p className="text-zinc-500 dark:text-zinc-400 text-xs mt-2 leading-relaxed">
                Ideal for new builders to establish their profile, search teammates, and join hackathons.
              </p>
            </div>

            <div className="mt-2">
              <button className="w-full inline-flex items-center justify-center rounded-full bg-zinc-950 hover:bg-zinc-900 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-black font-semibold text-xs py-2.5 px-5 transition-all duration-200 cursor-pointer">
                Choose This Plan
              </button>
            </div>

            <div className="w-full h-px bg-zinc-200/60 dark:bg-zinc-800/40 my-1"></div>

            <div className="space-y-3.5 text-xs font-normal text-zinc-600 dark:text-zinc-300 flex-grow">
              <div className="flex items-center gap-2.5">
                <Check className="w-3.5 h-3.5 text-zinc-300 dark:text-zinc-700 shrink-0" />
                <span>Find Teammates</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-3.5 h-3.5 text-zinc-300 dark:text-zinc-700 shrink-0" />
                <span>Smart Matching</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-3.5 h-3.5 text-zinc-300 dark:text-zinc-700 shrink-0" />
                <span>Team Discovery</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-3.5 h-3.5 text-zinc-300 dark:text-zinc-700 shrink-0" />
                <span>Build Teams</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-3.5 h-3.5 text-zinc-300 dark:text-zinc-700 shrink-0" />
                <span>Join Requests</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-3.5 h-3.5 text-zinc-300 dark:text-zinc-700 shrink-0" />
                <span>Compatibility Score</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-3.5 h-3.5 text-zinc-300 dark:text-zinc-700 shrink-0" />
                <span>Hackathon Explorer</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-3.5 h-3.5 text-zinc-300 dark:text-zinc-700 shrink-0" />
                <span>Builder Profiles</span>
              </div>
            </div>
            
          </div>

          {/* Card 2: Growth (with outer wrapper to allow sibling badge rendering on top of border & filters) */}
          <div className="relative flex flex-col hover:-translate-y-1.5 transition-all duration-300 group">
            
            {/* Card Content Container */}
            <div className="w-full flex-grow relative rounded-[28px] border-2 border-brand-green/40 dark:border-brand-green/20 bg-white dark:bg-[#0c0c0e]/80 backdrop-blur-md p-6 md:p-7 flex flex-col gap-5 shadow-sm group-hover:shadow-[0_20px_40px_rgba(163,230,53,0.08)] dark:group-hover:shadow-[0_20px_40px_rgba(163,230,53,0.18)] group-hover:border-brand-green dark:group-hover:border-brand-green transition-all duration-300">
              
              <div className="flex flex-col">
                <h3 className="text-xl font-semibold font-sans tracking-tight text-zinc-900 dark:text-white">Growth</h3>
                
                <div className="flex items-baseline mt-3 mb-1">
                  <span className="text-3xl md:text-4xl font-extrabold font-sans tracking-tight text-zinc-950 dark:text-white">₹399</span>
                  <span className="text-xs text-zinc-400 dark:text-zinc-500 ml-1.5 font-medium">/month</span>
                  <span className="text-[8px] font-black text-brand-green-dark dark:text-brand-green bg-brand-green/10 dark:bg-brand-green/10 px-1.5 py-0.5 rounded ml-2 uppercase tracking-wider">Est. Price</span>
                </div>
                
                <p className="text-zinc-500 dark:text-zinc-400 text-xs mt-2 leading-relaxed">
                  Perfect for growing teams ready to build with advanced strategies, AI assistance, and analytics.
                </p>
              </div>

              <div className="mt-2">
                <button className="w-full inline-flex items-center justify-center rounded-full bg-zinc-950 hover:bg-zinc-900 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-black font-semibold text-xs py-2.5 px-5 transition-all duration-200 cursor-pointer">
                  Coming Soon (Join Waitlist)
                </button>
              </div>

              <div className="w-full h-px bg-zinc-200/60 dark:bg-zinc-800/40 my-1"></div>

              <div className="space-y-3.5 text-xs font-normal text-zinc-600 dark:text-zinc-300 flex-grow">
                <div className="flex items-center gap-2.5">
                  <Check className="w-3.5 h-3.5 text-zinc-300 dark:text-zinc-700 shrink-0" />
                  <span>Team Chat</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-3.5 h-3.5 text-zinc-300 dark:text-zinc-700 shrink-0" />
                  <span>AI Hackathon Assistant</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-3.5 h-3.5 text-zinc-300 dark:text-zinc-700 shrink-0" />
                  <span>Team Workspace</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-3.5 h-3.5 text-zinc-300 dark:text-zinc-700 shrink-0" />
                  <span>Smart Recommendations</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-3.5 h-3.5 text-zinc-300 dark:text-zinc-700 shrink-0" />
                  <span>Team Analytics</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-3.5 h-3.5 text-zinc-300 dark:text-zinc-700 shrink-0" />
                  <span>Reputation System</span>
                </div>
              </div>
              
            </div>

            {/* EARLY ACCESS corner badge as sibling to render perfectly on top of borders and blur filters */}
            <div className="absolute top-[2px] right-[2px] h-[22px] z-10 bg-brand-green text-black font-black text-[8px] tracking-widest px-4 flex items-center justify-center rounded-tr-[26px] rounded-bl-md uppercase select-none shadow-[0_2px_8px_rgba(163,230,53,0.25)]">
              Early Access
            </div>

          </div>

        </div>
      </section>

      {/* Newsletter Mini Section */}
      <section className="w-full px-6 md:px-14 xl:px-20 pb-10 md:pb-12 z-10">
        <div className="w-full rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white/40 dark:bg-zinc-950/30 backdrop-blur-sm px-5 md:px-7 py-5 md:py-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 md:gap-6">
          <div>
            <p className="text-zinc-900 dark:text-zinc-100 text-sm md:text-base font-semibold">Get CoBUILD updates</p>
            <p className="text-zinc-500 dark:text-zinc-400 text-xs md:text-sm mt-1">New features, launch notes, and hackathon opportunities.</p>
          </div>

          <form className="w-full lg:w-auto flex flex-col sm:flex-row gap-2.5">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-[280px] md:w-[320px] rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white/90 dark:bg-zinc-900/70 text-zinc-800 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 px-4 py-2.5 text-sm outline-none focus:border-brand-green/70 focus:ring-2 focus:ring-brand-green/20 transition-all"
            />
            <button
              type="submit"
              className="rounded-xl bg-brand-green text-black font-semibold text-sm px-5 py-2.5 hover:bg-[#b7ef4e] transition-colors cursor-pointer"
            >
              Get updates
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-zinc-300/80 dark:border-zinc-800/80 bg-white/40 dark:bg-[#050507]/40 z-10 mt-6">
        <div className="w-full px-6 md:px-14 xl:px-20 py-10 md:py-12">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 lg:gap-14">
            <div className="shrink-0">
              <div className="flex items-center gap-2.5 select-none">
                <span className="text-brand-green font-sans font-extrabold text-xl leading-none">&#123;&gt;_&#125;</span>
                <h3 className="text-2xl font-black tracking-tight leading-none">
                  <span className="text-zinc-950 dark:text-white">Co</span>
                  <span className="text-brand-green">BUILD</span>
                </h3>
              </div>
              <p className="mt-4 text-zinc-500 dark:text-zinc-500 text-xs md:text-sm leading-7 max-w-xs">
                A team-building platform for students to find serious teammates and ship better hackathon projects.
              </p>
            </div>

            <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-0 sm:gap-0 lg:gap-0 lg:max-w-[42%] lg:ml-auto">
              <div>
              <h4 className="text-zinc-800 dark:text-zinc-300 text-base font-medium">Product</h4>
              <div className="mt-4 space-y-2.5 text-zinc-500 dark:text-zinc-500 text-xs md:text-sm">
                <a href="#features" className="block hover:text-brand-green-dark dark:hover:text-brand-green transition-colors">Features</a>
                <a href="#how-it-works" className="block hover:text-brand-green-dark dark:hover:text-brand-green transition-colors">How it works</a>
                <a href="#listings" className="block hover:text-brand-green-dark dark:hover:text-brand-green transition-colors">Listings</a>
                <a href="#pricing" className="block hover:text-brand-green-dark dark:hover:text-brand-green transition-colors">Pricing</a>
              </div>
              </div>

              <div>
              <h4 className="text-zinc-800 dark:text-zinc-300 text-base font-medium">Support</h4>
              <div className="mt-4 space-y-2.5 text-zinc-500 dark:text-zinc-500 text-xs md:text-sm">
                <a href="#" className="block hover:text-brand-green-dark dark:hover:text-brand-green transition-colors">Help center</a>
                <a href="#" className="block hover:text-brand-green-dark dark:hover:text-brand-green transition-colors">Account information</a>
                <a href="#" className="block hover:text-brand-green-dark dark:hover:text-brand-green transition-colors">Contact us</a>
                <a href="#" className="block hover:text-brand-green-dark dark:hover:text-brand-green transition-colors">System status</a>
              </div>
              </div>

              <div>
              <h4 className="text-zinc-800 dark:text-zinc-300 text-base font-medium">Legal</h4>
              <div className="mt-4 space-y-2.5 text-zinc-500 dark:text-zinc-500 text-xs md:text-sm">
                <a href="#" className="block hover:text-brand-green-dark dark:hover:text-brand-green transition-colors">Terms and Conditions</a>
                <a href="#" className="block hover:text-brand-green-dark dark:hover:text-brand-green transition-colors">Privacy Policy</a>
                <a href="#" className="block hover:text-brand-green-dark dark:hover:text-brand-green transition-colors">Cookie Policy</a>
              </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full border-t border-zinc-200/80 dark:border-zinc-900/80"></div>

        <div className="w-full px-6 md:px-14 xl:px-20 py-3">
          <div className="relative flex items-center justify-start text-xs md:text-sm text-zinc-400 dark:text-zinc-600 min-h-[20px]">
            <p className="text-left">&copy; {new Date().getFullYear()} CoBUILD. All rights reserved.</p>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-4">
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="hover:text-brand-green-dark dark:hover:text-brand-green transition-colors">LinkedIn</a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-brand-green-dark dark:hover:text-brand-green transition-colors">GitHub</a>
            </div>
          </div>
        </div>
      </footer>


    </div>
  )
}

export default Landing
