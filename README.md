# CoBUILD — Find Your Builders

CoBUILD is a premium teammate-matching and hackathon discovery platform tailored for students and builders. 

## The Problem
Many talented students want to build projects or enter hackathons, but struggle to find committed teammates. They face issues like mismatch in skill sets, differing goals, or team members losing interest and dropping out midway.

## The Solution
CoBUILD solves this by connecting builders based on **skills compatibility**, **mutual goals**, and a **"seriousness score"**. It streamlines the journey from profile creation to team formation and final hackathon submission.

---

## Core Product Features

### 1. Smart Teammate Discovery
- Filter and search for serious builders based on roles (Frontend, Backend, ML, Design), tech stacks, and shared interests.
- Assemble complementary teams (e.g., matching a Frontend Dev + ML Engineer + UI/UX Designer).

### 2. Seriousness & Compatibility Metrics
- Know if teammates fit before collaborating. Compatibility scores are calculated using skill synergy, shared goals, and historical reliability.

### 3. Active Hackathon Dashboard
- Discover and join hybrid, online, and offline hackathons with direct links to apply.
- Post open builder roles for your existing hackathon teams.

### 4. Premium Elite Subscription
- Unlock direct messaging to elite builders, priority matchmaking, unlimited team entries, and highlighted profiles to stand out.

---

## Tech Stack

- **Core**: React 19 + TypeScript + Vite 8
- **Styling**: Tailwind CSS v4 + Custom HSL variables (supporting class-based light/dark themes)
- **Animations**: GSAP (GreenSock Animation Platform) + GSAP ScrollTrigger
- **Icons**: Lucide React

## Interactive UI Animations

- **Hero Word Slot Rotator**: Dynamic, self-centering lottery wheel slot machine roll animation rotating through builder roles (*teammates*, *squad*, *builders*, *founders*, *designers*) with realistic motion blur and bounce ease-outs.
- **Blurred Stats Counters**: Landing page statistic counters (Builders, Open Teams, Hackathons) that count up rapidly on viewport entrance with motion blur fading out as numbers settle.
- **Bento Cards Scroll Entrance**: Staggered scroll-triggered fade-in and scale entrance for Features cards.
- **Wavy Timeline SVG Drawing**: Interactive, scroll-bound SVG timeline path drawing that connects all workflow steps dynamically as the user scrolls.
- **Get Started Button Hover**: High-contrast outline filling animation with transitioning arrow indicators.

---

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
