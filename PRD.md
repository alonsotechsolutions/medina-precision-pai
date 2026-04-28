# Planning Guide

A competitive, conversion-focused website for Medina Precision Painting, a Warner Robins-area painting contractor. The site showcases comprehensive services, builds credibility through testimonials and certifications, displays portfolio work, and makes it easy for potential customers to request free estimates.

**Experience Qualities**:
1. **Trustworthy** - The site must establish credibility and confidence through specific credentials, real testimonials, service area details, and professional presentation that competes with established contractors like Paint Boss GA
2. **Action-Oriented** - Clear, persistent CTAs and easy quote request process that removes friction and converts visitors into leads efficiently
3. **Comprehensive** - Demonstrates full range of capabilities and expertise through detailed service descriptions, feature lists, portfolio examples, and competitive differentiators

**Complexity Level**: Light Application (multiple features with basic state)
This is a marketing and lead generation website with enhanced interactivity including a floating CTA button that appears on scroll, comprehensive quote form with multiple fields, portfolio gallery display, and testimonial showcase. Requires scroll event handling and dialog state management.

## Essential Features

### Comprehensive Services Section with Feature Lists
- **Functionality**: Display 6 detailed service offerings (Interior, Exterior, Cabinet Refinishing, Commercial, Drywall Repair, Color Consultation) each with specific features listed
- **Purpose**: Help customers understand the full scope of services and specific capabilities, competing with comprehensive contractor sites
- **Trigger**: Automatically visible on page load as a key section
- **Progression**: Page loads → Services section visible with icon-based cards → User scans service types and feature lists → User identifies relevant service → User clicks CTA to request quote
- **Success criteria**: Services are clearly categorized with descriptive text, visual differentiation, and checkmarked feature lists showing specific capabilities

### Customer Testimonials Section
- **Functionality**: Display 3 five-star testimonials from satisfied Georgia customers with names, locations, and detailed reviews
- **Purpose**: Build trust and social proof by showing real customer experiences and satisfaction
- **Trigger**: Scrolling to testimonials section
- **Progression**: User views testimonials → Reads authentic reviews with star ratings → Sees customer names and locations → Builds confidence in choosing ColorCraft
- **Success criteria**: Testimonials feel authentic, include specific details, and reinforce quality and professionalism

### Portfolio/Gallery Section
- **Functionality**: Showcase 6 project examples across different categories (Interior, Exterior, Cabinets, Commercial)
- **Purpose**: Demonstrate quality of work and range of project types to potential customers
- **Trigger**: Scrolling to gallery section
- **Progression**: User views gallery section → Sees grid of project placeholders with titles and categories → Reviews variety of work types
- **Success criteria**: Projects display attractively in responsive grid and showcase breadth of capabilities

### Enhanced Quote Request Form with Floating CTA
- **Functionality**: Collect detailed customer information (name, email, phone, address, service type, property type, description) via dialog modal; floating CTA button appears after scrolling past hero section
- **Purpose**: Convert website visitors into leads efficiently with easy access to quote form from anywhere on page
- **Trigger**: User clicks "Get Free Quote" button in header, hero, floating button, or CTA sections
- **Progression**: User clicks CTA → Form modal opens → User fills in detailed contact info and project details → Submits form → Receives confirmation toast message
- **Success criteria**: Form is comprehensive yet easy to complete, validates input, floating CTA appears on scroll, provides clear confirmation

### Service Areas Section
- **Functionality**: Display list of 12 specific Georgia cities/communities served (Atlanta, Marietta, Roswell, Alpharetta, etc.)
- **Purpose**: Build local relevance and help with SEO by showing specific service coverage
- **Trigger**: Scrolling to service areas section  
- **Progression**: User views service areas → Sees their city listed → Confirms business serves their location → More likely to request quote
- **Success criteria**: Cities are clearly displayed with visual badges, Georgia focus is clear

### Competitive Differentiators Section
- **Functionality**: Highlight 6 key advantages with icons (Award-Winning Service, Expert Craftsmen, Fully Insured, Upfront Pricing, 2-Year Warranty, Flexible Scheduling) plus 6 operational details
- **Purpose**: Directly compete with other contractors by showcasing specific credentials, insurance coverage, warranty, and quality commitments
- **Trigger**: Scrolling to "Why Choose ColorCraft" section
- **Progression**: User views differentiators → Reads specific advantages → Sees premium paint brands mentioned → Understands insurance/warranty coverage → Feels confident choosing this contractor
- **Success criteria**: Differentiators are specific (not generic), include insurance amount and warranty duration, mention premium paint brands

### Enhanced About Section with Credentials
- **Functionality**: Company story since 2006 with specific credential badges (EPA Lead-Safe Certified, Licensed & Bonded, $2M Liability Insurance, BBB Accredited)
- **Purpose**: Build credibility through experience, certifications, and professional credentials that match or exceed competitors
- **Trigger**: Scrolling to about section
- **Progression**: User learns about company history → Sees years of experience → Reviews credential badges → Builds trust in professionalism
- **Success criteria**: Content balances personal story with professional credentials, badges are specific and verifiable

## Edge Case Handling

- **Empty Form Submission**: Validate all required fields (name, email, phone, service type, property type) and show inline error messages before allowing submission
- **Floating CTA Overlap**: Floating quote button positioned to not overlap footer or other content, with proper z-index layering
- **Mobile Form Scrolling**: Quote form dialog has scrollable content on mobile to handle small viewports
- **Long Service Area Lists**: Service areas displayed as flex-wrap badges to accommodate variable city name lengths
- **Testimonial Length Variation**: Cards have consistent heights despite varying testimonial text lengths
- **Form Submission Feedback**: Clear toast notification confirms quote request submission and form resets properly

## Design Direction

The design should feel professional, established, and trustworthy - conveying expertise and credibility to compete with established Atlanta contractors. The aesthetic should be clean and modern with purposeful use of color to draw attention to CTAs while maintaining a refined, mature look. Visual elements reference the painting trade through texture patterns and color choices while projecting sophistication and reliability. The overall feel should inspire confidence that this is an experienced, insured, professional operation - not a small-time handyman service.

## Color Selection

A bold, patriotic palette inspired by the company logo featuring deep navy blue, vibrant orange-red accents, and light blue highlights - creating an energetic, trustworthy, and distinctive brand presence.

- **Primary Color**: Rich navy blue (oklch(0.35 0.15 250)) - Communicates trust, professionalism, and stability; matches the deep blue in the logo
- **Secondary Colors**: 
  - Vibrant sky blue (oklch(0.50 0.15 220)) for highlights - Adds energy and references the light blue paint strokes in the logo
  - Soft gray-blue (oklch(0.96 0.01 250)) for backgrounds - Provides a clean, professional foundation
- **Accent Color**: Bold orange-red (oklch(0.58 0.20 35)) - High-energy CTA color that matches "PRECISION PAINTING" text in logo, creates urgency and warmth
- **Foreground/Background Pairings**: 
  - Primary backgrounds (Navy Blue oklch(0.35 0.15 250)): White text (oklch(0.99 0 0)) - Ratio 10.2:1 ✓
  - Light backgrounds (oklch(0.96 0.01 250)): Dark navy text (oklch(0.25 0.05 250)) - Ratio 11.5:1 ✓
  - Accent (Orange-Red oklch(0.58 0.20 35)): White text (oklch(0.99 0 0)) - Ratio 4.8:1 ✓
  - Body backgrounds (White oklch(0.99 0 0)): Dark navy text (oklch(0.25 0.05 250)) - Ratio 12.0:1 ✓

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
  - Card component for service offerings (now with detailed feature lists), testimonials (with star ratings), and gallery items
  - Dialog component for comprehensive quote request form modal (scrollable on mobile)
  - Button component with variants (accent for primary CTAs like "Schedule Free Estimate", outline for secondary actions like phone)
  - Badge component for credentials, service areas, trust signals, and project categories
  - Motion components (framer-motion) for scroll-triggered animations and floating CTA entrance
  - Form components (Input, Textarea, Select) for detailed quote request with validation states
  
- **Customizations**: 
  - Hero section with gradient background and diagonal line pattern texture
  - Floating CTA button that appears after scrolling 800px down the page
  - Gallery grid with gradient placeholder backgrounds and category badges
  - Testimonial cards with quote icons and 5-star rating displays
  - Service cards expanded to show bulleted feature lists with checkmark icons
  - Service areas displayed as outline badge grid with flex-wrap
  
- **States**: 
  - Buttons: Accent background for CTAs, hover brightens slightly with smooth transition, active state, focus shows ring
  - Form inputs: Default border, focus shows primary-colored border and ring, error state shows red border, required fields marked with asterisk
  - Cards: Default state, hover lifts with shadow and slight scale (1.02), maintains smooth 300ms transition
  - Floating CTA: Hidden initially, fades in with slide-up animation when scroll threshold reached
  
- **Icon Selection**: 
  - PaintBrush for logo and brand identity
  - House for interior services
  - Buildings for exterior/commercial services
  - Palette for cabinet refinishing
  - PaintBucket for commercial painting
  - Hammer for drywall repair
  - Lightbulb for color consultation
  - Phone for contact CTAs
  - EnvelopeSimple for email contact
  - MapPin for service area
  - Calendar for scheduling CTAs
  - Star (filled) for testimonial ratings
  - Quotes for testimonial design
  - CheckCircle (filled) for feature lists and benefit lists
  - ShieldCheck for insurance/credentials
  - CurrencyDollar for pricing transparency
  - Clock for experience
  - Sparkle for satisfaction guarantee
  - Medal for awards
  - Users for team/craftsmen
  - ImageIcon for gallery placeholders
  
- **Spacing**: 
  - Section padding: py-20 for major sections, py-12 for benefits bar
  - Card padding: p-6 for content, gap-4 for internal spacing
  - Component gaps: gap-8 for section-level spacing, gap-6 for card grids, gap-4 for related elements, gap-2 for tight groups
  - Container max-width: max-w-7xl mx-auto for main content, max-w-4xl for CTA sections
  - Grid gaps: gap-6 for card grids, gap-4 for form fields, gap-3 for service area badges
  
- **Mobile**: 
  - Hero text size reduces from text-6xl to text-4xl on mobile
  - Service grid changes from 3 columns (lg:grid-cols-3) to 2 (md:grid-cols-2) to 1 column on mobile
  - Benefits bar goes from 4 columns (lg:grid-cols-4) to 2 columns (grid-cols-2) on mobile
  - Gallery grid adapts from 3 columns (lg:grid-cols-3) to 2 on tablet (sm:grid-cols-2) to 1 on mobile
  - Testimonials stack from 3 columns (md:grid-cols-3) to single column on mobile
  - Why Choose section features stack from 3 columns to single column
  - Floating CTA button remains visible and properly positioned on mobile
  - Form dialog becomes scrollable with max-height constraint on mobile viewports
  - Header shows phone number on sm and above, hides on mobile to save space
  - Padding reduces from px-8 to px-4 on mobile devices
  - Service area badges wrap naturally on all screen sizes
