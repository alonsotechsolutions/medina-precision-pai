export const VALID_PAGES = ['home', 'services', 'gallery', 'about', 'contact'] as const
export type PageKey = typeof VALID_PAGES[number]

export interface NavTab {
  label: string
  href: string
  page: PageKey
}

export const navTabs: NavTab[] = [
  { label: 'Services', href: '#/services', page: 'services' },
  { label: 'Gallery', href: '#/gallery', page: 'gallery' },
  { label: 'About', href: '#/about', page: 'about' },
  { label: 'Contact', href: '#/contact', page: 'contact' },
]

export const pageTitles: Record<PageKey, string> = {
  home: 'Medina Precision Painting — Warner Robins, GA',
  services: 'Services & Process — Medina Precision Painting',
  gallery: 'Gallery — Medina Precision Painting',
  about: 'About — Medina Precision Painting',
  contact: 'Contact — Medina Precision Painting',
}

export const pageDescriptions: Record<PageKey, string> = {
  home: 'Professional interior, exterior, and cabinet painting in Warner Robins, GA. Licensed, insured, 2-year workmanship warranty. Free estimates from Eddie Medina.',
  services: 'Interior, exterior, cabinet, and commercial painting services across Middle Georgia. Surface prep, premium paints, and a 6-step process built around your home.',
  gallery: 'Browse recent interior and exterior painting projects completed by Medina Precision Painting around Warner Robins, Macon, and Atlanta.',
  about: 'Meet Eddie Medina — owner-operated painter serving Warner Robins, GA. Licensed, insured, and committed to precision work and a 2-year warranty.',
  contact: 'Request a free painting estimate from Medina Precision Painting in Warner Robins, GA. Call, text, or send a quote request — typical response within one business day.',
}
