import { SERVICE_OPTIONS } from '@/types/quote'
import type { QuoteRequest } from '@/types/quote'

export const formatServices = (values: string[]): string =>
  values
    .map(v => SERVICE_OPTIONS.find(o => o.value === v)?.label ?? v)
    .join(', ')

// Normalizes legacy quotes (stored with a single `serviceType` string) into
// the new `serviceTypes` array shape used everywhere else in the app.
export const getQuoteServices = (q: QuoteRequest): string[] => {
  if (Array.isArray(q.serviceTypes) && q.serviceTypes.length > 0) return q.serviceTypes
  if (q.serviceType) return [q.serviceType]
  return []
}
