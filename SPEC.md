# IT Services Company Website - Specification

## 1. Project Overview

- **Project Name**: TechNova - IT Solutions Website
- **Type**: Single-page marketing website
- **Core Functionality**: A modern, animated IT services company website with navbar, hero, about, contact, and footer sections
- **Target Users**: Potential clients looking for IT services, software development, and tech solutions

## 2. Technical Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Language**: TypeScript
- **Optimization**: Minimal bundle size using code splitting and optimized images

## 3. UI/UX Specification

### Color Palette
- **Primary**: `#0f172a` (Dark Navy)
- **Secondary**: `#1e293b` (Slate)
- **Accent**: `#06b6d4` (Cyan)
- **Accent Secondary**: `#8b5cf6` (Purple)
- **Text Primary**: `#f8fafc` (White)
- **Text Secondary**: `#94a3b8` (Gray)
- **Gradient**: `linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)`

### Typography
- **Font Family**: "Outfit" (Google Font) - Modern, tech-focused
- **Headings**: Bold, tracking-tight
- **Body**: Regular, leading-relaxed
- **Sizes**:
  - H1: 4rem (64px)
  - H2: 2.5rem (40px)
  - H3: 1.5rem (24px)
  - Body: 1rem (16px)

### Layout
- **Max Width**: 1280px
- **Sections**: Full viewport width with contained content
- **Responsive**: Mobile (< 768px), Tablet (768px - 1024px), Desktop (> 1024px)

### Visual Effects
- Glassmorphism cards with backdrop blur
- Gradient borders and buttons
- Smooth scroll behavior
- Particle background effect in hero
- Staggered reveal animations on scroll

## 4. Component Structure

### Navbar
- Fixed position, glassmorphism background
- Logo (left): "TechNova" with gradient text
- Navigation links (center): Home, About, Services, Contact
- CTA Button (right): "Get Started"
- Mobile: Hamburger menu with slide-in drawer

### Hero Section
- Full viewport height
- Animated particle/network background
- Main headline with typing effect
- Subheadline describing services
- Two CTA buttons: "Our Services" and "Contact Us"
- Floating tech icons animation

### About Section
- Two-column layout (text left, visual right)
- Stats counter animation (Projects, Clients, Awards, Years)
- Tech stack logos
- Mission statement

### Services Section
- Grid layout (3 columns desktop, 1 mobile)
- Service cards with:
  - Icon
  - Title
  - Description
  - Hover: scale up + glow effect

### Contact Section
- Two-column: Form + Info
- Form fields: Name, Email, Message
- Submit button with loading state
- Contact info: Email, Phone, Address, Social links

### Footer
- 4-column grid
- Company info, Quick links, Services, Newsletter
- Copyright + Social icons
- Back to top button

## 5. Animations Specification

### Page Load
- Staggered fade-in for all elements (0.1s delay between)
- Hero text slides up with opacity

### Scroll Animations
- Sections fade-in and slide-up on enter
- Stats count up animation
- Cards scale in sequence

### Interactions
- Buttons: Scale + glow on hover
- Links: Underline slide animation
- Cards: Lift + shadow on hover
- Navbar: Background opacity change on scroll

## 6. Performance Optimization

- Next.js Image optimization
- Dynamic imports for heavy components
- Framer Motion lazy motion
- Minified production build
- Font optimization with next/font

## 7. Folder Structure

```
test_web/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Services.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   └── lib/
│       └── utils.ts
├── public/
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

## 8. Acceptance Criteria

- [ ] Website loads without errors
- [ ] All 5 sections visible (Navbar, Hero, About, Contact, Footer)
- [ ] Animations play smoothly on page load
- [ ] Scroll animations trigger correctly
- [ ] Responsive on mobile, tablet, desktop
- [ ] Form is interactive
- [ ] Navigation links scroll to sections
- [ ] Bundle size is optimized

