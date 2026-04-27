# Planning Guide

A professional website showcasing a painting business, highlighting services, portfolio work, and making it easy for potential customers to request quotes and contact the business.

**Experience Qualities**:
1. **Professional** - The site should instill confidence in the quality and reliability of the painting services through polished design and clear information
2. **Welcoming** - Warm, approachable aesthetic that makes homeowners feel comfortable reaching out for quotes and consultations
3. **Inspiring** - Visual presentation that helps visitors imagine their own spaces transformed through quality painting work

**Complexity Level**: Content Showcase (information-focused)
This is primarily a marketing and lead generation website that presents the business's services, showcases completed projects, and facilitates customer contact. It doesn't require complex state management or multiple user flows beyond basic form interactions.

## Essential Features

### Services Overview Section
- **Functionality**: Display the range of painting services offered (interior, exterior, commercial, residential, specialty finishes)
- **Purpose**: Help potential customers quickly understand what the business offers and find relevant services
- **Trigger**: Automatically visible on page load as a key section
- **Progression**: Page loads → Services section visible with icon-based cards → User scans service types → User identifies relevant service
- **Success criteria**: Services are clearly categorized with descriptive text and visual differentiation

### Portfolio/Gallery Section
- **Functionality**: Showcase before/after photos and completed project images
- **Purpose**: Build trust and demonstrate quality of work to potential customers
- **Trigger**: Scrolling to gallery section or clicking navigation link
- **Progression**: User views gallery section → Sees grid of project images → Can click images for larger view → Reviews quality of work
- **Success criteria**: Images load quickly, display attractively, and effectively showcase the business's capabilities

### Quote Request Form
- **Functionality**: Collect customer information and project details for quote generation
- **Purpose**: Convert website visitors into leads by making it easy to request estimates
- **Trigger**: User clicks "Get a Quote" or "Request Estimate" button
- **Progression**: User clicks CTA → Form modal/section opens → User fills in contact info and project details → Submits form → Receives confirmation message
- **Success criteria**: Form is easy to complete, validates input, and provides clear confirmation of submission

### Contact Information Section
- **Functionality**: Display business contact details, service area, and business hours
- **Purpose**: Make it easy for customers to reach out through their preferred method
- **Trigger**: Automatically visible in dedicated section and footer
- **Progression**: User needs contact info → Scrolls to contact section → Finds phone, email, or physical address → Contacts business
- **Success criteria**: Contact information is prominently displayed and easily accessible from any point on the page

### About/Company Section
- **Functionality**: Brief overview of the business, experience, credentials, and values
- **Purpose**: Build credibility and personal connection with potential customers
- **Trigger**: Scrolling to about section
- **Progression**: User wants to learn about business → Reads about section → Learns about experience/credentials → Builds trust
- **Success criteria**: Content is concise, builds credibility, and highlights key differentiators

## Edge Case Handling

- **Empty Form Submission**: Validate all required fields and show inline error messages before allowing submission
- **Large Image Files**: Display loading skeletons while gallery images load to prevent layout shift
- **Mobile Navigation**: Hamburger menu for smaller screens with smooth open/close animations
- **Form Submission Failure**: Show user-friendly error message with option to retry or contact directly via phone/email
- **Long Service Descriptions**: Truncate text with "Read more" expansion to maintain clean layout

## Design Direction

The design should feel professional yet approachable, conveying expertise without being cold or corporate. The aesthetic should be clean and modern with warm, inviting touches that make homeowners feel comfortable reaching out. Visual elements should subtly reference the painting trade through color palette and texture while maintaining sophistication.

## Color Selection

A palette that balances professionalism with warmth, using rich, paint-inspired tones.

- **Primary Color**: Deep teal blue (oklch(0.45 0.08 220)) - Communicates trust, professionalism, and reliability while being distinctive and memorable
- **Secondary Colors**: 
  - Warm cream/beige (oklch(0.95 0.015 85)) for backgrounds - Creates a canvas-like, inviting foundation
  - Soft gray (oklch(0.88 0.005 220)) for supporting surfaces - Provides subtle depth and structure
- **Accent Color**: Burnt orange/terracotta (oklch(0.62 0.15 45)) - Draws attention to CTAs and important elements, adds warmth and energy that complements the cool primary
- **Foreground/Background Pairings**: 
  - Primary backgrounds (Deep Teal oklch(0.45 0.08 220)): White text (oklch(0.98 0 0)) - Ratio 9.1:1 ✓
  - Warm Cream backgrounds (oklch(0.95 0.015 85)): Dark charcoal text (oklch(0.25 0.01 220)) - Ratio 12.8:1 ✓
  - Accent (Burnt Orange oklch(0.62 0.15 45)): White text (oklch(0.98 0 0)) - Ratio 4.7:1 ✓
  - Body backgrounds (White oklch(0.98 0 0)): Dark charcoal text (oklch(0.25 0.01 220)) - Ratio 13.2:1 ✓

## Font Selection

Typography should balance professionalism with accessibility and warmth - a modern sans-serif that's clean and trustworthy paired with subtle personality.

- **Primary Font**: Plus Jakarta Sans - A geometric sans-serif with a friendly, approachable character that maintains professionalism
- **Secondary Font**: Inter - For body text and supporting content, offering excellent readability and a technical precision

- **Typographic Hierarchy**: 
  - H1 (Hero Title): Plus Jakarta Sans Bold / 56px / tight letter spacing (-0.02em) / line-height 1.1
  - H2 (Section Headers): Plus Jakarta Sans Bold / 40px / tight letter spacing (-0.01em) / line-height 1.2
  - H3 (Service Titles): Plus Jakarta Sans Semibold / 24px / normal letter spacing / line-height 1.3
  - Body Text: Inter Regular / 16px / normal letter spacing / line-height 1.6
  - Button Text: Plus Jakarta Sans Semibold / 16px / slight letter spacing (0.01em)
  - Small/Caption: Inter Regular / 14px / line-height 1.5

## Animations

Animations should feel professional and purposeful, adding polish without distraction. Subtle entrance animations for sections as they scroll into view create a sense of quality and attention to detail. Interactive elements like buttons and cards should respond with gentle hover effects (slight scale or color shifts). The quote form modal should enter with a smooth fade and scale animation. Page transitions should be minimal - focus on micro-interactions that make the interface feel responsive and alive without delaying user actions.

## Component Selection

- **Components**: 
  - Card component for service offerings with hover effects
  - Dialog component for quote request form modal
  - Button component with variants (primary for CTAs, outline for secondary actions)
  - Badge component for highlighting credentials or special offers
  - Separator for visual breaks between sections
  - Scroll Area for terms/conditions if needed in forms
  - Form components (Input, Textarea, Select) for quote request form with proper validation states
  
- **Customizations**: 
  - Hero section with full-width background using gradient overlays and subtle texture patterns
  - Custom gallery grid with responsive columns (3 on desktop, 2 on tablet, 1 on mobile)
  - Floating "Get Quote" button that appears on scroll for persistent CTA access
  - Custom testimonial cards with quotation styling
  
- **States**: 
  - Buttons: Default has solid background, hover lifts with subtle shadow and slight brightness increase, active scales down slightly (0.98), focus shows ring
  - Form inputs: Default has border, focus shows thicker primary-colored border and ring, error state shows destructive border with error message below, success shows green check icon
  - Cards: Default state, hover lifts with shadow and slight scale (1.02), maintains smooth transition
  
- **Icon Selection**: 
  - PaintBrush or PaintRoller for services header
  - House for residential services
  - Buildings for commercial services
  - Palette for specialty finishes
  - Phone for contact CTAs
  - Envelope for email contact
  - MapPin for service area/location
  - CheckCircle for completed features or benefits list
  - Image for gallery section
  
- **Spacing**: 
  - Section padding: pt-20 pb-16 (vertical rhythm)
  - Card padding: p-6 for content, gap-4 for internal spacing
  - Component gaps: gap-8 for section-level spacing, gap-4 for related elements, gap-2 for tight groups
  - Container max-width: max-w-7xl mx-auto for content constraint
  - Grid gaps: gap-6 for card grids, gap-4 for form fields
  
- **Mobile**: 
  - Hero text size reduces from text-6xl to text-4xl
  - Service grid changes from 3 columns (lg:grid-cols-3) to 1 column on mobile
  - Gallery grid adapts from 3 columns to 2 on tablet (md:grid-cols-2) to 1 on mobile
  - Navigation collapses to hamburger menu on mobile with slide-in drawer
  - Floating quote button remains visible but slightly smaller on mobile
  - Form inputs and buttons become full-width on mobile
  - Padding reduces from px-8 to px-4 on mobile devices
