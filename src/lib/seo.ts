import type { Faq } from '@/data/faqs'

export const setMetaTag = (selector: string, content: string): void => {
  if (typeof document === 'undefined') return
  const el = document.querySelector<HTMLMetaElement>(selector)
  if (el) el.setAttribute('content', content)
}

// Inject FAQPage structured data once. Helps Google render an FAQ rich
// result on the homepage SERP. Returns a cleanup function suitable for
// useEffect.
export const injectFaqJsonLd = (faqs: Faq[]): (() => void) => {
  if (typeof document === 'undefined') return () => {}
  const scriptId = 'faq-jsonld'
  if (document.getElementById(scriptId)) return () => {}

  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.id = scriptId
  script.text = JSON.stringify(data)
  document.head.appendChild(script)
  return () => {
    document.getElementById(scriptId)?.remove()
  }
}
