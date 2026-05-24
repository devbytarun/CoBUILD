# CoBUILD — Find Your Builders

CoBUILD is a premium landing page platform designed to help students find serious teammates, join hackathons, and build winning ideas together. It integrates advanced matching criteria, bento grid structures, and interactive timelines.

## Tech Stack

- **Core**: React 19 + TypeScript + Vite 8
- **Styling**: Tailwind CSS v4 + Custom HSL variables (supporting class-based light/dark themes)
- **Animations**: GSAP (GreenSock Animation Platform) + GSAP ScrollTrigger
- **Icons**: Lucide React

## Interactive Features & Animations

- **Hero Word Slot Rotator**: Dynamic, self-centering lottery wheel slot machine roll animation rotating through builder roles (*teammates*, *squad*, *builders*, *founders*, *designers*) with realistic motion blur and bounce ease-outs.
- **Blurred Stats Counters**: Landing page statistic counters (Builders, Open Teams, Hackathons) that count up rapidly on viewport entrance with motion blur fading out as numbers settle.
- **Bento Cards Scroll Entrance**: Staggered scroll-triggered fade-in and scale entrance for Features cards.
- **Wavy Timeline SVG Drawing**: Interactive, scroll-bound SVG timeline path drawing that connects all workflow steps dynamically as the user scrolls.
- **Get Started Button Hover**: High-contrast outline filling animation with transitioning arrow indicators.

## Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the local development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```
