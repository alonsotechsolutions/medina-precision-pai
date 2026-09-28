import { VALID_PAGES } from '@/data/navigation'
import type { PageKey } from '@/data/navigation'

export interface ParsedHashPage {
  page: PageKey
  notFound: boolean
}

export const parseHashPage = (): ParsedHashPage => {
  if (typeof window === 'undefined') return { page: 'home', notFound: false }
  const h = window.location.hash
  if (h.startsWith('#/')) {
    const rest = h.slice(2).split('?')[0]
    const key = rest.toLowerCase() as PageKey
    if ((VALID_PAGES as readonly string[]).includes(key)) {
      return { page: key, notFound: false }
    }
    return { page: 'home', notFound: rest.length > 0 && !rest.startsWith('print') }
  }
  return { page: 'home', notFound: false }
}

// A standalone printable color sheet route: `#/print?p=<slug>`.
// Used in lead emails so Eddie (and the customer) can print a no-chrome,
// color-accurate one-pager to take to a paint store.
export const parsePrintSlug = (): string | null => {
  if (typeof window === 'undefined') return null
  const h = window.location.hash
  if (!h.startsWith('#/print')) return null
  const query = h.split('?')[1] || ''
  const params = new URLSearchParams(query)
  return params.get('p')
}
