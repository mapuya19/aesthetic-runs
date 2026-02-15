# Aesthetic Runs Design System

## Direction & Feel

**Intent:**
- Who: Urban explorers and recreational runners at home, on the go, and discovering new cities
- What: Browse routes, follow navigation, track progress, discover beautiful runs
- Feel: Cool, modern, adventurous, with energetic and playful personality

**Overall Vibe:** Modern exploration meets cool aesthetics - navy depth with vibrant purple and pink accents

## Design Tokens

### Color Palette
- **Primary Brand:** Indigo (#6366f1) - modern, cool, energetic
- **Brand Hover:** Darker indigo (#4f46e5)
- **Brand Light:** Light indigo (#a5b4fc)
- **Secondary Accent:** Pink (#ec4899) - vibrant, playful
- **Additional Accents:**
  - Navy (#0f172a) - deep, premium base
  - Purple (#8b5cf6) - creative, mystical
  - Purple Light (#c4b5fd)
- **Success:** Emerald (#10b981)
- **Warning:** Amber (#f59e0b)
- **Error:** Red (#ef4444)

### Backgrounds (Cool neutrals)
- Surface 0: #f8fafc
- Surface 1: #f1f5f9
- Surface 2: #e2e8f0
- Surface 3: #cbd5e1

### Text Hierarchy (Cool tones)
- Primary: #0f172a
- Secondary: #475569
- Tertiary: #64748b
- Muted: #94a3b8

### Borders (Low opacity, whisper-quiet edges)
- Subtle: rgba(15, 23, 42, 0.06)
- Soft: rgba(15, 23, 42, 0.10)
- Medium: rgba(15, 23, 42, 0.15)
- Strong: rgba(15, 23, 42, 0.25)
- Focus: rgba(99, 102, 241, 0.50)

### Shadows (Subtle layered approach with cool tints)
- Sm: 0 1px 2px 0 rgba(15, 23, 42, 0.05)
- Md: 0 4px 6px -1px rgba(15, 23, 42, 0.08), 0 2px 4px -1px rgba(15, 23, 42, 0.04)
- Lg: 0 10px 15px -3px rgba(15, 23, 42, 0.10), 0 4px 6px -2px rgba(15, 23, 42, 0.05)
- Xl: 0 20px 25px -5px rgba(15, 23, 42, 0.12), 0 10px 10px -5px rgba(15, 23, 42, 0.06)

### Border Radius
- Sm: 6px (inputs, buttons)
- Md: 8px (cards, containers)
- Lg: 12px (larger cards)
- Xl: 16px (modals)
- 2xl: 24px (special elements)

### Spacing Scale (Base: 4px)
- Micro: 4px, 8px (icon gaps, tight spacing)
- Component: 12px, 16px, 20px, 24px (buttons, cards, form elements)
- Section: 32px, 40px, 48px (between groups, major separation)

## Depth Strategy

**Approach:** Subtle layered shadows for approachable, premium feel

**Key decisions:**
- Cards use `shadow-card` (medium) with `shadow-elevated` on hover
- Modals use `shadow-modal` (extra large)
- Whispers-quiet surface elevation changes
- Borders are low-opacity for subtle definition
- No harsh dramatic shadows

## Component Patterns

### Button
**Variants:**
- `default` - Brand color (indigo) with shadow-subtle
- `secondary` - Surface 1 with border
- `outline` - Border-only with hover background
- `ghost` - Transparent with hover
- `accent` - Pink accent color
- `destructive` - Error color

**Sizes:**
- `default` - h-10 px-4 text-sm
- `sm` - h-9 px-3 text-xs rounded-sm
- `lg` - h-12 px-8 text-base rounded-lg
- `icon` - h-10 w-10

**States:**
- All buttons have: hover, active (scale-98), focus-visible ring, disabled
- Transition: duration-300 with ease
- Active state: scale-[0.98]

### Card
**Base:**
- Background: var(--background) or var(--surface-0)
- Border: None (rely on shadows)
- Shadow: shadow-card, shadow-elevated on hover
- Radius: var(--radius-lg) or 2xl
- Padding: 24px or 32px

**Hover effect:**
- transform: hover:-translate-y-1
- shadow: hover:shadow-elevated
- transition: duration-300

### Input Fields
**Base:**
- Background: var(--surface-1)
- Border: var(--border-soft)
- Radius: var(--radius-md)
- Padding: 12px 16px
- Focus: border-[var(--brand)] with ring-2 ring-[var(--brand)]/20

### Map Markers
**Pulsing effect:**
- Inner circle with scale-125 on hover
- Outer ping animation with opacity-20
- Border: 4px white
- Shadow: shadow-elevated

**Colors:**
- Start: Emerald green (#10b981)
- End: Pink (#ec4899)
- Waypoints: Purple (#8b5cf6)
- Route line: Indigo (#6366f1)

**Sizes:**
- sm: w-6 h-6 (waypoints)
- md: w-8 h-8
- lg: w-10 h-10 (start/end)

### Route Cards
**Layout:**
- Image: h-56 with overflow-hidden
- Image hover: scale-105 transition-transform duration-500
- Badge overlay: top-4 right-4 with surface-0/90 backdrop-blur-sm
- Hover effect: Button changes from secondary to default

### Navigation
**Bar:**
- Background: var(--background) with backdrop-blur-md
- Border-bottom: var(--border-soft)
- Logo: text-[var(--brand)] font-bold

### Modals
**Backdrop:**
- Overlay: var(--foreground)/40 with backdrop-blur-sm

**Content:**
- Background: var(--background)
- Radius: 2xl
- Shadow: shadow-modal
- Animation: animate-in fade-in zoom-in-95 duration-300

## Typography

**Font:** Geist (Google Fonts)

**Hierarchy:**
- Headlines: font-bold, tight tracking
- Body: comfortable weight for readability
- Labels: font-medium at smaller sizes
- Data: monospace with tabular spacing for alignment

## Animation & Transitions

**Speeds:**
- Fast micro-interactions: 150ms ease-out
- Standard transitions: 250-300ms cubic-bezier(0.4, 0, 0.2, 1)
- Large transitions: 350-600ms cubic-bezier(0.4, 0, 0.2, 1)
- Page transitions: 400ms ease-out for smooth entry

**Types:**
- Hover transforms: scale-102, scale-105, scale-110 (subtle, not jarring)
- Opacity: hover, disabled states
- Ping animation: for pulsing markers
- Slide-in, fade-in: for page content with ease-out easing
- Gradient-x: 15s cycle for background gradients

**Animation Classes:**
- `.page-enter` - Global page fade-up animation
- `animate-in fade-in slide-in-from-bottom-2` - Subtle slide up
- `animate-in fade-in slide-in-from-top` - Nav bar fade in
- All animations use ease-out for smoother feel

## Dark Mode

**Strategy:**
- Invert values while maintaining cool palette
- Use deep navy base with lighter surface tints
- Desaturate brand colors slightly
- Use borders more than shadows (less visible on dark)
- Backgrounds: #0f172a → #1e293b → #334155 → #475569
- Text: White hierarchy #f8fafc → #cbd5e1 → #94a3b8 → #64748b

## Layout Patterns

### Landing Page
- Hero: Centered with animated gradient overlays and floating pulse orbs
- Feature cards: 3-column grid with hover scale/rotate effects and staggered animations
- Section backgrounds: var(--surface-1) with gradient
- Animations: Fade-in, slide-in, spin, pulse, and gradient-x animations

### Auth Pages (Login/Register)
- Split-screen layout (desktop)
- Left: Navy-purple-indigo gradient with features
- Right: Form centered with max-w-md

### Home/Dashboard
- Navigation: Top bar with brand and logout
- Route cards: 1/2/3 column responsive grid
- Cards: Image with badge, hover transforms

### Map Page
- Split: Map + sidebar (desktop)
- Mobile: Stacked (map h-64, sidebar auto height)
- Sticky header: Route info with back button
- RouteStepper: Scrollable with sticky bottom controls
- Auto-scroll to active step when changed
- Padding bottom-24 to ensure active step is visible above controls

## Signature Elements

1. **Pulsing map markers** - Animated, alive feel for wayfinding (green start, pink end, purple waypoints)
2. **Navy/purple/pink palette** - Cool, modern, energetic - not typical blue/green
3. **Card hover states** - Subtle lift with scale transforms and rotation effects
4. **Animated gradient overlays** - Purple/pink/blue flowing gradients with pulse effects
5. **Progress celebration** - Gradient success cards with indigo-purple-pink transitions

## Utility Classes

Use these token-mapped utilities from globals.css:
- `.surface-0/1/2/3` - Background levels
- `.text-primary/secondary/tertiary/muted` - Text hierarchy
- `.border-subtle/soft/medium/strong` - Border weights
- `.shadow-subtle/card/elevated/modal` - Shadow levels
- `.surface-1`, `.surface-2`, etc. for backgrounds

## File Locations

- Design tokens: `app/globals.css`
- Button component: `components/ui/button.tsx`
- MapView: `components/MapView.tsx`
- RouteStepper: `components/RouteStepper.tsx`
- EmailVerifiedModal: `components/EmailVerifiedModal.tsx`

## Consistency Checks

When adding new components:
1. Use CSS variables for colors, not hex values
2. Apply shadow from defined scale
3. Use border radius from scale
4. Include all states (hover, focus, disabled)
5. Transitions should use defined durations
6. Spacing should be multiples of 4px
7. Always consider mobile responsiveness with sm:, md:, lg: breakpoints
8. Use ease-out easing for smoother animations (avoid spring/bounce)

## Mobile Responsiveness

All pages are fully responsive:
- **Landing:** Stacked buttons on mobile, reduced text sizes, responsive padding
- **Auth:** Single column on mobile, split-screen on lg+
- **Home:** 1 column on mobile, 2 on md, 3 on lg; responsive grid gaps
- **Map:** Stacked on mobile (map 256px, sidebar below), side-by-side on lg+
- **Navigation:** Responsive padding, hidden email on mobile, full width on sm+

Breakpoints used:
- `sm`: 640px (small devices)
- `md`: 768px (tablets)
- `lg`: 1024px (laptops/desktop)
