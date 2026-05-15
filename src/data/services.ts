import type { Icon } from '@phosphor-icons/react'
import {
  Drop,
  Hammer,
  House,
  Medal,
  PaintBrush,
  Palette,
  ShieldCheck,
  Sparkle,
  Wrench,
} from '@phosphor-icons/react'

export interface Service {
  icon: Icon
  title: string
  description: string
  features: string[]
}

export const services: Service[] = [
  {
    icon: House,
    title: 'Interior Painting',
    description: 'Transform your living spaces with expert interior painting. Perfect finish on drywall, wood, and more.',
    features: ['Wall & ceiling painting', 'Trim & door refinishing', 'Drywall finishing', 'Multiple surface types'],
  },
  {
    icon: Palette,
    title: 'Exterior Painting',
    description: 'Protect and beautify your home with durable paint. Expert application on siding, wood, metal, and masonry.',
    features: ['House painting', 'Siding & masonry', 'Metal surfaces', 'Weather-resistant finishes'],
  },
  {
    icon: PaintBrush,
    title: 'Cabinet Refinishing',
    description: 'Modernize your kitchen or bathroom with professional cabinet painting and refinishing services.',
    features: ['Kitchen cabinets', 'Bathroom vanities', 'Custom color matching', 'Smooth cabinet finish'],
  },
  {
    icon: Sparkle,
    title: 'High-End Residential',
    description: 'Premium painting services for luxury homes with meticulous attention to detail and flawless results.',
    features: ['Luxury finishes', 'Premium materials', 'Detailed craftsmanship', 'High-end properties'],
  },
  {
    icon: ShieldCheck,
    title: 'Commercial & Industrial',
    description: 'Professional painting for offices, retail, warehouses, and industrial facilities throughout Georgia.',
    features: ['Commercial properties', 'Industrial facilities', 'Large-scale projects', 'Flexible scheduling'],
  },
  {
    icon: Drop,
    title: 'Pressure Washing',
    description: 'Restore curb appeal and prep surfaces for paint with professional power washing for homes and businesses.',
    features: ['Siding & driveways', 'Decks & patios', 'Pre-paint prep', 'Fence cleaning'],
  },
  {
    icon: Hammer,
    title: 'Drywall & Repairs',
    description: 'Patch, repair, and refinish damaged drywall, holes, and water-damaged surfaces before painting.',
    features: ['Hole & crack repair', 'Water damage repair', 'Texture matching', 'Popcorn ceiling removal'],
  },
  {
    icon: Wrench,
    title: 'Deck & Fence Staining',
    description: 'Protect and beautify wood surfaces with quality stains and sealers built to last Georgia weather.',
    features: ['Decks & pergolas', 'Wood fences', 'Sealing & waterproofing', 'Color & stain matching'],
  },
  {
    icon: Medal,
    title: 'Surface Expertise',
    description: 'Expert knowledge of paints and primers for any surface. Perfect product selection for your project.',
    features: ['Paint selection guidance', 'Primer expertise', 'Surface-specific solutions', 'Quality materials'],
  },
]
