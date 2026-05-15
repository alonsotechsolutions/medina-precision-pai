import { useEffect } from 'react'
import { pageDescriptions, pageTitles } from '@/data/navigation'
import type { PageKey } from '@/data/navigation'
import { setMetaTag } from '@/lib/seo'

/**
 * Keeps `document.title` and the standard SEO meta tags
 * (description, og:*, twitter:*) in sync with the current page key.
 */
export const usePageMeta = (currentPage: PageKey): void => {
  useEffect(() => {
    document.title = pageTitles[currentPage]
    const desc = pageDescriptions[currentPage]
    setMetaTag('meta[name="description"]', desc)
    setMetaTag('meta[property="og:title"]', pageTitles[currentPage])
    setMetaTag('meta[property="og:description"]', desc)
    setMetaTag('meta[name="twitter:title"]', pageTitles[currentPage])
    setMetaTag('meta[name="twitter:description"]', desc)
  }, [currentPage])
}
