import { useEffect } from 'react'
import { pageDescriptions, pageTitles } from '@/data/navigation'
import type { PageKey } from '@/data/navigation'
import { setLinkHref, setMetaTag } from '@/lib/seo'
import { DEFAULT_OG_IMAGE_PATH, SITE_URL } from '@/lib/site'

/**
 * Keeps `document.title` and the standard SEO meta tags
 * (description, og:*, twitter:*) in sync with the current page key.
 */
export const usePageMeta = (currentPage: PageKey): void => {
  useEffect(() => {
    const pageUrl = currentPage === 'home' ? SITE_URL : `${SITE_URL}/#/${currentPage}`
    document.title = pageTitles[currentPage]
    const desc = pageDescriptions[currentPage]
    setMetaTag('meta[name="description"]', desc)
    setMetaTag('meta[property="og:title"]', pageTitles[currentPage])
    setMetaTag('meta[property="og:description"]', desc)
    setMetaTag('meta[property="og:url"]', pageUrl)
    setMetaTag('meta[property="og:image"]', `${SITE_URL}${DEFAULT_OG_IMAGE_PATH}`)
    setMetaTag('meta[name="twitter:title"]', pageTitles[currentPage])
    setMetaTag('meta[name="twitter:description"]', desc)
    setMetaTag('meta[name="twitter:image"]', `${SITE_URL}${DEFAULT_OG_IMAGE_PATH}`)
    setLinkHref('link[rel="canonical"]', pageUrl)
  }, [currentPage])
}
