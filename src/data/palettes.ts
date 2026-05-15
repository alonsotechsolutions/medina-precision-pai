import type { ColorPalette, PaintSwatch } from '@/types/palette'

export const COLOR_PALETTES: ColorPalette[] = [
  {
    slug: 'coastal-calm',
    name: 'Coastal Calm',
    mood: 'Serene & Airy',
    swatches: [
      { hex: '#E8EEF2' },
      { hex: '#A8C3D1' },
      { hex: '#5E8CA8' },
      { hex: '#2F4858' },
    ],
  },
  {
    slug: 'modern-farmhouse',
    name: 'Modern Farmhouse',
    mood: 'Warm & Welcoming',
    swatches: [
      { hex: '#F5F1EA' },
      { hex: '#D9CFC1' },
      { hex: '#8C7B6B' },
      { hex: '#3A322B' },
    ],
  },
  {
    slug: 'bold-statement',
    name: 'Bold Statement',
    mood: 'Dramatic & Confident',
    swatches: [
      { hex: '#F2EFEA' },
      { hex: '#C9B79C' },
      { hex: '#7A2E1F' },
      { hex: '#1B1B1B' },
    ],
  },
  {
    slug: 'georgia-greens',
    name: 'Georgia Greens',
    mood: 'Natural & Fresh',
    swatches: [
      { hex: '#F2F5EE' },
      { hex: '#BFD3B0' },
      { hex: '#557A46' },
      { hex: '#2B3A29' },
    ],
  },
  {
    slug: 'classic-neutral',
    name: 'Classic Neutral',
    mood: 'Timeless & Versatile',
    swatches: [
      { hex: '#FFFFFF' },
      { hex: '#EAE6DF' },
      { hex: '#A89F92' },
      { hex: '#4B463F' },
    ],
  },
  {
    slug: 'sunset-warmth',
    name: 'Sunset Warmth',
    mood: 'Cozy & Inviting',
    swatches: [
      { hex: '#FFF5EC' },
      { hex: '#F0C6A0' },
      { hex: '#D27D5B' },
      { hex: '#6E2A1E' },
    ],
  },
]

export const getPaletteBySlug = (slug: string): ColorPalette | undefined =>
  COLOR_PALETTES.find(p => p.slug === slug)

export const formatSwatchLabel = (s: PaintSwatch): string => {
  const product = [s.brand, s.code, s.name].filter(Boolean).join(' · ')
  return product ? `${s.hex} — ${product}` : s.hex
}
