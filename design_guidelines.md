# Femtomed Website Redesign - Design Guidelines

## Design Approach
**Reference-Based**: Inspired by Ziemer Group's professional aesthetic but elevated with enhanced animations and modern interactions. Medical technology sophistication meets contemporary web design.

## Core Design Principles
1. **Medical Precision**: Clean, clinical aesthetic with surgical precision in spacing and alignment
2. **Premium Technology**: High-end feel reflecting advanced ophthalmic equipment
3. **Trust & Authority**: Professional B2B presentation for eye care specialists
4. **Modern Dynamism**: Generous animations that enhance rather than distract

## Typography System
- **Headings**: Inter or Manrope (700-800 weight) - modern, technical precision
- **Body**: Inter (400-500 weight) - excellent readability for medical content
- **Sizes**: Hero (4xl-6xl), Section Headers (3xl-4xl), Subheaders (xl-2xl), Body (base-lg)
- **Russian Cyrillic**: Ensure full character support

## Layout & Spacing
**Spacing Units**: Tailwind 4, 6, 8, 12, 16, 20, 24 for consistency
- **Sections**: py-20 to py-32 (desktop), py-12 to py-16 (mobile)
- **Containers**: max-w-7xl for main content, max-w-6xl for text-heavy sections
- **Grid Systems**: 3-column for products/features (desktop), 2-column (tablet), 1-column (mobile)

## Page-Specific Layouts

### Homepage (Animated Hero)
- **Hero Section**: Full viewport (90vh) with animated 3D medical equipment visualization or high-quality product imagery with parallax effect
- **Sections**: TRADE-IN program highlight, CLEAR technology showcase, Product carousel, Latest conferences grid, Video gallery preview, Quick contact CTA
- **Animations**: Scroll-triggered fade-ins, parallax backgrounds, hover transforms on cards

### CLEAR Technology Page
- **Interactive Visualization**: Step-by-step animated procedure explanation
- **Benefits Grid**: 3-column animated cards with icons
- **Video Integration**: Prominent embedded player with thumbnail grid
- **Clinical Data**: Clean data presentation with animated counters

### Products Pages
- **Hero**: Large product image with specs overlay
- **Feature Tabs**: Animated tab switching for different capabilities
- **Comparison Tables**: Side-by-side specifications
- **Gallery**: Modal lightbox for detailed images

### Vision Testing Game
- **Test Selection**: Card-based menu with test previews
- **5 Tests Include**: Sivtsev Chart (visual acuity), Amsler Grid (macular function), Ishihara (color blindness), Astigmatism wheel, Contrast sensitivity
- **Interactive Canvas**: Full-screen test environment with progress tracking
- **Results Dashboard**: Animated results with recommendations

### News & Conferences
- **Masonry Grid**: Pinterest-style layout for varied content
- **Filters**: Date range, event type, location (animated transitions)
- **Cards**: Image + date + title + excerpt with hover lift effect

### Contact Page
- **Split Layout**: Form (left) + TRADE-IN info (right)
- **Animated Form**: Field focus animations, validation states
- **Contact Methods**: Phone, email, office address with icons

## Component Library

### Navigation
- **Sticky Header**: Transparent on scroll-top, solid with blur on scroll
- **Desktop Menu**: Horizontal with dropdown mega-menus for products
- **Mobile**: Slide-in drawer with animated menu items
- **Language Switcher**: RU/EN toggle (if needed)

### Cards
- **Product Cards**: Image + title + brief + CTA, scale on hover (1.02)
- **News Cards**: Date badge + image + headline, slide-up content reveal
- **Conference Cards**: Logo + date + location + registration link

### Buttons
- **Primary**: Solid with subtle gradient, transform scale on hover
- **Secondary**: Outlined with fill transition
- **CTA**: Larger with arrow icon, pulse animation on key CTAs
- **Blur Backgrounds**: For buttons over hero images

### Media Components
- **Video Players**: Custom controls, thumbnail previews
- **Image Galleries**: Lightbox modals with smooth transitions
- **3D Product Viewers**: Interactive rotation (for equipment)

### Forms
- **Floating Labels**: Animate to top on focus
- **Validation**: Real-time with smooth error messages
- **File Upload**: Drag-and-drop with progress indicators

## Animation Strategy
**Intersection Observer**: Trigger animations on scroll into view
- **Fade-In**: Stagger children by 100ms delay
- **Slide-In**: From bottom (20px) with opacity transition
- **Scale**: Subtle scale (0.95 to 1) on cards
- **Parallax**: Background images move at 0.5x scroll speed
- **Hover States**: Transform, shadow, color transitions (300ms ease)
- **Loading**: Skeleton screens, not spinners

**Performance**: RequestAnimationFrame for smooth 60fps, lazy-load below fold content

## Images
- **Hero Images**: High-resolution medical equipment shots (FEMTO LDV laser systems, diagnostic devices)
- **Product Images**: Professional product photography with transparent backgrounds
- **Conference Images**: Event photos, venue shots
- **Background Patterns**: Subtle medical/technical patterns (circuit-like, optical patterns)
- **Icons**: Heroicons for UI, custom medical icons where needed

## Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigation for all interactions
- ARIA labels for animations
- Reduced motion media queries
- High contrast mode support

## Mobile Optimization
- Touch-friendly targets (min 44px)
- Swipe gestures for carouses/galleries
- Simplified animations on mobile
- Progressive enhancement for game section