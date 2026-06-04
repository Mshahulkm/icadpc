# ICAD FIFA World Cup 2026 — Technical Specification

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^18.2 | UI framework |
| react-dom | ^18.2 | DOM renderer |
| typescript | ^5.0 | Type safety |
| vite | ^5.0 | Build tool |
| tailwindcss | ^3.4 | Utility-first CSS |
| @tailwindcss/typography | ^0.5 | Typography plugin |
| gsap | ^3.12 | Core animation engine, timelines |
| @gsap/react | ^2.1 | GSAP React integration |
| three | ^0.160 | 3D trophy scene (hero) |
| @types/three | ^0.160 | Three.js type definitions |
| aos | ^2.3 | Scroll-triggered reveal animations |
| @types/aos | ^3.0 | AOS type definitions |
| react-countup | ^6.5 | Animated statistics counters |
| canvas-confetti | ^1.9 | Confetti burst on registration click |
| lucide-react | ^0.400 | Icon library (trophy, medal, users, etc.) |
| shadcn/ui | latest | Accordion, Button, Card, Badge, Table components |
| class-variance-authority | ^0.7 | Component variant styling |
| clsx | ^2.1 | Conditional class merging |
| tailwind-merge | ^2.0 | Tailwind class deduplication |

**Fonts (Google Fonts CDN)**: Oswald (700), Montserrat (600,700), Poppins (400), Noto Sans Malayalam (400,700)

---

## Component Inventory

### shadcn/ui Components

| Component | Source | Usage |
|-----------|--------|-------|
| Accordion | `npx shadcn add accordion` | Contest Rules (14 Malayalam items), FAQ (5 items) |
| Button | `npx shadcn add button` | All CTAs (Register Now, View Rules, etc.) |
| Card | `npx shadcn add card` | News cards, Announcement cards, Prize cards, Winner cards |
| Badge | `npx shadcn add badge` | Entry fee pill, date badges, category tags |
| Table | `npx shadcn add table` | Leaderboard data rows |

### Custom Sections (each a self-contained React component)

| Component | File | Description |
|-----------|------|-------------|
| Navbar | `src/sections/Navbar.tsx` | Fixed nav with logo, links, CTA, mobile hamburger. IntersectionObserver for active state. Dark/light toggle. |
| HeroSection | `src/sections/HeroSection.tsx` | Full-viewport hero with Three.js canvas, headline, CTAs, scroll indicator. GSAP ScrollTrigger for camera zoom. |
| StatsBar | `src/sections/StatsBar.tsx` | 4-column animated statistics. react-countup for number animation. |
| AboutSection | `src/sections/AboutSection.tsx` | Asymmetric layout with text + rotating football decoration. |
| RegistrationSection | `src/sections/RegistrationSection.tsx` | Glassmorphism card with eligibility, fee badge, CTA with confetti. |
| RulesSection | `src/sections/RulesSection.tsx` | Malayalam rules in shadcn Accordion. 14 items with numbered circles. |
| NewsSection | `src/sections/NewsSection.tsx` | 4-card grid for FIFA 2026 tournament updates. |
| AnnouncementsSection | `src/sections/AnnouncementsSection.tsx` | Stack of announcement cards loaded from `announcements.json`. |
| LeaderboardSection | `src/sections/LeaderboardSection.tsx` | Styled table with top 10 placeholder data, medal icons for top 3. |
| WinnersSection | `src/sections/WinnersSection.tsx` | 3-card gallery with placeholder gradients for photos. |
| PrizesSection | `src/sections/PrizesSection.tsx` | 3 prize cards (gold/silver/bronze) + bonus card. Gold shimmer keyframe. |
| FAQSection | `src/sections/FAQSection.tsx` | 5-item accordion with chevron rotation. |
| ContactSection | `src/sections/ContactSection.tsx` | Glassmorphism contact card with icon list. |
| Footer | `src/sections/Footer.tsx` | 3-column footer with brand, links, social icons, visitor counter. |

### Reusable Components

| Component | File | Used By |
|-----------|------|---------|
| SectionHeader | `src/components/SectionHeader.tsx` | eyebrow + heading pattern used by ~10 sections |
| GlassCard | `src/components/GlassCard.tsx` | Glassmorphism wrapper (Registration, Contact, Announcements) |
| ConfettiButton | `src/components/ConfettiButton.tsx` | Button wrapper that triggers confetti on click (Navbar, Hero, Registration) |
| ScrollProgress | `src/components/ScrollProgress.tsx` | Top progress bar (App root) |
| ThreeScene | `src/components/ThreeScene.tsx` | Three.js canvas for hero trophy (HeroSection) |

### Hooks

| Hook | File | Purpose |
|------|------|---------|
| useScrollProgress | `src/hooks/useScrollProgress.tsx` | Returns 0-1 scroll progress for progress bar and GSAP scrubbing |
| useActiveSection | `src/hooks/useActiveSection.tsx` | IntersectionObserver tracking which section is in viewport for nav highlighting |
| useLocalStorage | `src/hooks/useLocalStorage.tsx` | Persist dark/light mode preference and visitor count |
| useVisitorCount | `src/hooks/useVisitorCount.tsx` | Increment and read visitor count from localStorage |

---

## Animation Implementation

| Animation | Library | Implementation Approach | Complexity |
|-----------|---------|------------------------|------------|
| 3D Trophy Scene (hero) | Three.js + @react-three/fiber | Procedural trophy geometry using Three.js primitives (cylinders, spheres, torus). 6 light sources. Auto-rotation via useFrame. Lazy-loaded with IntersectionObserver. | **High** 🔒 |
| Hero camera zoom on scroll | GSAP ScrollTrigger | scrub-linked timeline: camera z 8→4, trophy scale 1.5→2.0, over first 50vh | **High** 🔒 |
| Golden particles (hero) | Three.js + GSAP | 200 BufferGeometry points with GSAP-driven upward float. Speed increases on scroll via ScrollTrigger. | **Medium** |
| Scroll progress bar | GSAP ScrollTrigger | Single scrub tween: width 0%→100% | **Low** |
| Stat counter animation | react-countup | Trigger start on AOS enter event. 2s duration, easeOut. | **Low** |
| Section card reveals | AOS | `AOS.init({ duration: 600, once: true, offset: 100 })`. fade-up, fade-right, zoom-in variants per section. | **Low** |
| Staggered reveals | AOS | `data-aos-delay` attribute on children: 80ms (accordion), 100ms (announcements), 150ms (news), 200ms (winners/prizes) | **Low** |
| Confetti burst | canvas-confetti | `confetti()` call from button click handler. Origin from button rect. Gold + green colors. | **Low** |
| Gold shimmer (prize card) | CSS @keyframes | Linear gradient sweep animation on border, 3s infinite loop | **Low** |
| Floating football decoration | CSS @keyframes | `rotate(0→360deg)` over 60s, linear, infinite | **Low** |
| Scroll indicator bounce | CSS @keyframes | `translateY(0→10px)` over 1.5s, ease-in-out, infinite | **Low** |
| Accordion expand/collapse | shadjn Accordion | Built-in animation. Chevron rotation via CSS transform on `[data-state=open]` | **Low** |
| Mobile menu slide | CSS transition | `transform: translateX(100%→0)` with backdrop fade. 300ms ease-out | **Low** |
| Dark/light mode transition | CSS transition | `transition: background-color 300ms, color 300ms` on root element | **Low** |
| Nav link underline | CSS | `::after` pseudo-element, `scaleX(0→1)` on hover. 200ms ease. | **Low** |
| Hover card lift | CSS transition | `translateY(-8px)` + box-shadow brighten. 400ms ease. | **Low** |
| Leaderboard row hover | CSS transition | Background color shift. 200ms. | **Low** |
| Trophy auto-rotation | Three.js useFrame | `trophy.rotation.y += 0.005` per frame (~0.3°/frame) | **Low** |
| Button hover effects | CSS transition | Scale 1.02, box-shadow glow, background color shift. 200ms. | **Low** |

---

## State & Logic Plan

### Global State (React Context)

**ThemeContext** — dark/light mode:
- State: `theme: 'dark' | 'light'`
- Persisted: `localStorage.setItem('icad-theme', theme)`
- Consumed by: Navbar (toggle), App (root class), all sections (CSS variables swap)

### Component-Local State

| Component | State | Description |
|-----------|-------|-------------|
| Navbar | `mobileMenuOpen: boolean` | Mobile slide-in panel visibility |
| Navbar | `activeSection: string` | Current viewport section ID from useActiveSection |
| AnnouncementsSection | `announcements: Announcement[]` | Fetched from `/data/announcements.json` via fetch() |
| AnnouncementsSection | `loading: boolean` | JSON fetch loading state |
| LeaderboardSection | `leaderboard: LeaderboardEntry[]` | Static placeholder data (could be fetched from JSON) |
| WinnersSection | `winners: Winner[]` | Static placeholder data (could be fetched from `/data/winners.json`) |
| FAQSection | `openItem: string` | Currently open accordion item ID |
| RulesSection | `openItem: string` | Currently open accordion item ID |
| Footer | `visitorCount: number` | From useVisitorCount hook |
| HeroSection | `sceneVisible: boolean` | IntersectionObserver triggers Three.js render loop |

### Data Flow

```
App.tsx
├── ThemeContext.Provider
│   ├── ScrollProgress (reads scroll position)
│   ├── Navbar (reads theme, active section)
│   ├── HeroSection (manages Three.js scene visibility)
│   ├── StatsBar (local countup state)
│   ├── AboutSection (static)
│   ├── RegistrationSection (confetti trigger)
│   ├── RulesSection (accordion open state)
│   ├── NewsSection (static cards)
│   ├── AnnouncementsSection ← fetch("/data/announcements.json")
│   ├── LeaderboardSection (static data)
│   ├── WinnersSection ← fetch("/data/winners.json")
│   ├── PrizesSection (static)
│   ├── FAQSection (accordion open state)
│   ├── ContactSection (static)
│   └── Footer (reads visitor count)
```

### Static JSON Files (GitHub Pages)

- `/data/announcements.json` — Array of `{ title, date, message, category }`
- `/data/winners.json` — Array of `{ name, year, position, photo }` (photo optional)
- `/data/leaderboard.json` — Array of `{ rank, name, points }`

All fetched at component mount with `useEffect + fetch()`.

### Key Logic Notes

1. **Three.js lazy loading**: The ThreeScene component should use an `IntersectionObserver` with rootMargin to start/stop the render loop. Only render when hero is within 200px of viewport.

2. **AOS + GSAP coexistence**: AOS handles entry animations for cards/sections. GSAP handles the hero scroll-driven camera and progress bar. Initialize AOS once in `App.tsx` useEffect.

3. **Confetti origin calculation**: On button click, get button's `getBoundingClientRect()`, compute center, pass as `origin: { x: centerX / windowWidth, y: centerY / windowHeight }` to confetti.

4. **Dark/light CSS**: Use CSS custom properties (`--bg-primary`, `--text-primary`, etc.) set on the root element via a data attribute (`data-theme="dark|light"`). All components reference these variables.

5. **Malayalam font loading**: Use Google Fonts link for Noto Sans Malayalam. Apply `font-family: 'Noto Sans Malayalam', sans-serif` with `lang="ml"` attribute on Malayalam text elements.

6. **Scroll indicator behavior**: Hide scroll indicator after user scrolls past 100px. Use scroll listener or GSAP ScrollTrigger.
