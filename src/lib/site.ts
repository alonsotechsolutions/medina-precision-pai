const ENV = (import.meta as unknown as { env: Record<string, string | undefined> }).env

const normalizeSiteUrl = (value?: string): string => {
  const fallback = 'https://medinaprecisionpainting.com'
  if (!value) return fallback
  return value.replace(/\/+$/, '') || fallback
}

const digitsOnly = (value?: string): string => (value || '').replace(/\D/g, '')

export const BUSINESS_NAME = 'Medina Precision Painting'
export const BUSINESS_PHONE = digitsOnly(ENV.VITE_BUSINESS_PHONE) || '4789552341'
export const BUSINESS_PHONE_DISPLAY = ENV.VITE_BUSINESS_PHONE_DISPLAY?.trim() || '(478) 955-2341'
export const BUSINESS_EMAIL = ENV.VITE_BUSINESS_EMAIL?.trim() || 'info@medinaprecisionpainting.com'
export const SITE_URL = normalizeSiteUrl(ENV.VITE_SITE_URL)
export const GOOGLE_REVIEW_URL =
  ENV.VITE_GOOGLE_REVIEW_URL?.trim() || 'https://www.google.com/search?q=Medina+Precision+Painting'
export const FACEBOOK_URL = ENV.VITE_FACEBOOK_URL?.trim() || ''
export const INSTAGRAM_URL = ENV.VITE_INSTAGRAM_URL?.trim() || ''
export const DEFAULT_OG_IMAGE_PATH = `${ENV.BASE_URL || '/'}og-image.svg`

export const buildPhoneHref = (phone: string = BUSINESS_PHONE): string => `tel:${digitsOnly(phone)}`
export const buildMailtoHref = (email: string = BUSINESS_EMAIL): string => `mailto:${email}`
