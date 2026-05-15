import type { ColorPalette } from './palette'

export interface QuoteRequest {
  id: string
  name: string
  email: string
  phone: string
  address: string
  /** One or more services the customer wants quoted. */
  serviceTypes: string[]
  /** @deprecated kept for backward-compat with quotes stored before multi-select was added. */
  serviceType?: string
  propertyType: string
  projectDescription: string
  preferredDate?: string
  budgetRange?: string
  referralSource?: string
  /** Palette the customer clicked on the Color Inspiration section, if any. */
  selectedPalette?: ColorPalette
  status: 'new' | 'contacted' | 'quoted' | 'completed'
  submittedAt: string
}

export type QuoteFormData = {
  name: string
  email: string
  phone: string
  address: string
  serviceTypes: string[]
  propertyType: string
  projectDescription: string
  preferredDate: string
  budgetRange: string
  referralSource: string
  selectedPalette?: ColorPalette
}

export const BLANK_QUOTE_FORM: QuoteFormData = {
  name: '',
  email: '',
  phone: '',
  address: '',
  serviceTypes: [],
  propertyType: '',
  projectDescription: '',
  preferredDate: '',
  budgetRange: '',
  referralSource: '',
  selectedPalette: undefined,
}

// ----------------------- Paint Cost Estimator config -----------------------
// Project types match the service-type values in the quote form so the
// estimator can prefill the quote dialog directly.
export type ProjectType =
  | 'interior'
  | 'exterior'
  | 'cabinets'
  | 'commercial'
  | 'pressure-washing'
  | 'drywall-repair'
  | 'deck-fence-staining'
  | 'popcorn-ceiling'

export type QualityLevel = 'standard' | 'premium' | 'luxury'

export interface ProjectConfig {
  label: string
  shortLabel: string
  baseRate: number          // $ per unit (sqft / door / patch)
  unitLabel: string         // slider label
  unitSuffix: string        // shown next to live value
  sliderMin: number
  sliderMax: number
  sliderStep: number
  defaultValue: number
  tip: string
  showRooms: boolean
  showQuality: boolean
  roomsLabel?: string
}

// Service options shown in the quote form. Values match the estimator's
// ProjectType keys so the estimator can prefill the form directly.
export const SERVICE_OPTIONS: { value: string; label: string }[] = [
  { value: 'interior',            label: 'Interior Painting' },
  { value: 'exterior',            label: 'Exterior Painting' },
  { value: 'cabinets',            label: 'Cabinet Refinishing' },
  { value: 'commercial',          label: 'Commercial Painting' },
  { value: 'pressure-washing',    label: 'Pressure Washing' },
  { value: 'drywall-repair',      label: 'Drywall & Repair' },
  { value: 'deck-fence-staining', label: 'Deck & Fence Staining' },
  { value: 'popcorn-ceiling',     label: 'Popcorn Ceiling Removal' },
  { value: 'other',               label: 'Other' },
]

// 2024–2025 Central-Georgia market averages for labor + materials.
export const PROJECT_CONFIG: Record<ProjectType, ProjectConfig> = {
  interior: {
    label: 'Interior Painting', shortLabel: 'Interior',
    baseRate: 3.50, unitLabel: 'Approximate Square Footage', unitSuffix: 'sq ft',
    sliderMin: 100, sliderMax: 5000, sliderStep: 50, defaultValue: 1200,
    tip: 'Avg bedroom ≈ 150 sq ft. Whole-home interiors ≈ 1,500–2,500 sq ft.',
    showRooms: true, showQuality: true, roomsLabel: 'Number of Rooms',
  },
  exterior: {
    label: 'Exterior Painting', shortLabel: 'Exterior',
    baseRate: 3.75, unitLabel: 'Exterior Wall Square Footage', unitSuffix: 'sq ft',
    sliderMin: 500, sliderMax: 8000, sliderStep: 100, defaultValue: 2200,
    tip: 'A 1-story 2,000 sq ft home has ≈ 2,000–2,500 sq ft of exterior wall.',
    showRooms: false, showQuality: true,
  },
  cabinets: {
    label: 'Cabinet Refinishing', shortLabel: 'Cabinets',
    baseRate: 95, unitLabel: 'Cabinet Doors & Drawer Fronts', unitSuffix: 'pieces',
    sliderMin: 5, sliderMax: 60, sliderStep: 1, defaultValue: 22,
    tip: 'Count every door and drawer front. Average kitchen ≈ 20–30 pieces.',
    showRooms: false, showQuality: true,
  },
  commercial: {
    label: 'Commercial Painting', shortLabel: 'Commercial',
    baseRate: 2.75, unitLabel: 'Paintable Square Footage', unitSuffix: 'sq ft',
    sliderMin: 500, sliderMax: 20000, sliderStep: 250, defaultValue: 4000,
    tip: 'Total wall + ceiling area for office, retail, or warehouse spaces.',
    showRooms: true, showQuality: true, roomsLabel: 'Number of Rooms / Areas',
  },
  'pressure-washing': {
    label: 'Pressure Washing', shortLabel: 'Pressure Wash',
    baseRate: 0.30, unitLabel: 'Surface Square Footage', unitSuffix: 'sq ft',
    sliderMin: 200, sliderMax: 6000, sliderStep: 100, defaultValue: 1500,
    tip: 'Driveways, siding, decks — total area to be washed.',
    showRooms: false, showQuality: false,
  },
  'drywall-repair': {
    label: 'Drywall & Repair', shortLabel: 'Drywall',
    baseRate: 75, unitLabel: 'Number of Patches / Repairs', unitSuffix: 'patches',
    sliderMin: 1, sliderMax: 30, sliderStep: 1, defaultValue: 4,
    tip: 'Holes, dents, popped nails, water damage — each repair counts as one patch.',
    showRooms: false, showQuality: false,
  },
  'deck-fence-staining': {
    label: 'Deck & Fence Staining', shortLabel: 'Deck / Fence',
    baseRate: 3.00, unitLabel: 'Surface Square Footage', unitSuffix: 'sq ft',
    sliderMin: 100, sliderMax: 3000, sliderStep: 50, defaultValue: 400,
    tip: 'A 12×16 ft deck ≈ 200 sq ft. For fences, multiply length × height.',
    showRooms: false, showQuality: true,
  },
  'popcorn-ceiling': {
    label: 'Popcorn Ceiling Removal', shortLabel: 'Popcorn',
    baseRate: 2.00, unitLabel: 'Ceiling Square Footage', unitSuffix: 'sq ft',
    sliderMin: 100, sliderMax: 3000, sliderStep: 50, defaultValue: 600,
    tip: 'Roughly equal to the floor area of the rooms being treated.',
    showRooms: true, showQuality: false, roomsLabel: 'Number of Rooms',
  },
}

export const QUALITY_OPTIONS: { value: QualityLevel; label: string; subtitle: string; multiplier: number }[] = [
  { value: 'standard', label: 'Standard', subtitle: 'Behr Premium Plus, Valspar 4000', multiplier: 1.0 },
  { value: 'premium',  label: 'Premium',  subtitle: 'S-W SuperPaint, BM Regal Select', multiplier: 1.25 },
  { value: 'luxury',   label: 'Luxury',   subtitle: 'S-W Emerald, BM Aura',            multiplier: 1.6 },
]
