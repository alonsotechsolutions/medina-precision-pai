import { useEffect, useState } from 'react'
import { parseHashPage, parsePrintSlug } from '@/lib/routing'
import type { PageKey } from '@/data/navigation'

export interface HashRoute {
  page: PageKey
  printSlug: string | null
  notFound: boolean
}

/**
 * Subscribes to `hashchange` and returns the current page key plus the
 * optional print-sheet slug. Scrolls to top when the page key changes.
 */
export const useHashRoute = (): HashRoute => {
  const initialPage = parseHashPage()
  const [page, setPage] = useState<PageKey>(() => initialPage.page)
  const [notFound, setNotFound] = useState<boolean>(() => initialPage.notFound)
  const [printSlug, setPrintSlug] = useState<string | null>(() => parsePrintSlug())

  useEffect(() => {
    const onHashChange = () => {
      const next = parseHashPage()
      setPrintSlug(parsePrintSlug())
      setNotFound(next.notFound)
      setPage(prev => {
        if (prev !== next.page) {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
        return next.page
      })
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return { page, printSlug, notFound }
}
