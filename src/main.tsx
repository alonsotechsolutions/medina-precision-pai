import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import { ErrorBoundary } from "react-error-boundary";

import App from './App.tsx'
import { ErrorFallback } from './ErrorFallback.tsx'
import logoImage from './assets/images/Logo.png'

import "./main.css"
import "./styles/theme.css"
import "./index.css"

// Inject favicon at runtime so it gets the bundler-hashed URL with the
// correct base path (the static <link> in index.html points at /src/... which
// 404s under GitHub Pages' repo subpath).
const setFavicon = (href: string) => {
  let link = document.querySelector<HTMLLinkElement>("link[rel~='icon']")
  if (!link) {
    link = document.createElement('link')
    link.rel = 'icon'
    document.head.appendChild(link)
  }
  link.type = 'image/png'
  link.href = href
}
setFavicon(logoImage)

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </ErrorBoundary>
)
