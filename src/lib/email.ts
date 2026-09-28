// Email integration for static hosts (including GitHub Pages).
// We try providers in order:
//   1) Formspree, 2) FormSubmit, 3) mailto fallback.
//
// All keys are sourced from VITE_* env vars with sensible defaults so the
// site keeps working even when the deployer forgets to set them.

import { BUSINESS_EMAIL } from '@/lib/site'

const ENV = (import.meta as unknown as { env: Record<string, string | undefined> }).env
const FORMSUBMIT_ENABLED = ENV.VITE_USE_FORMSUBMIT === 'true'

export const FORMSPREE_QUOTE_FORM_ID =
  ENV.VITE_FORMSPREE_QUOTE_FORM_ID?.trim() || ENV.VITE_FORMSPREE_ID?.trim() || ''

export const FORMSPREE_NEWSLETTER_FORM_ID =
  ENV.VITE_FORMSPREE_NEWSLETTER_FORM_ID || FORMSPREE_QUOTE_FORM_ID

export type EmailDeliveryChannel = 'formspree' | 'formsubmit' | 'mailto' | 'failed'

export const postToFormspree = async (
  formId: string,
  payload: Record<string, string | undefined>,
): Promise<boolean> => {
  if (!formId) return false
  try {
    const res = await fetch(`https://formspree.io/f/${formId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    })
    if (res.ok) return true
    console.warn('Formspree responded with non-OK status', res.status)
    return false
  } catch (err) {
    console.warn('Formspree submission failed:', err)
    return false
  }
}

export const postToFormSubmit = async (
  payload: Record<string, string | undefined>,
): Promise<boolean> => {
  if (!FORMSUBMIT_ENABLED) return false
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(BUSINESS_EMAIL)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        _captcha: 'false',
        _template: 'table',
        ...payload,
      }),
    })
    if (!res.ok) {
      console.warn('FormSubmit responded with non-OK status', res.status)
      return false
    }
    return true
  } catch (err) {
    console.warn('FormSubmit submission failed:', err)
    return false
  }
}

export const openMailtoFallback = (subject: string, body: string): boolean => {
  try {
    const mailto = `mailto:${BUSINESS_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.open(mailto, '_blank')
    return true
  } catch (err) {
    console.error('mailto fallback failed:', err)
    return false
  }
}

export interface DeliverEmailArgs {
  formspreeId: string
  subject: string
  replyTo?: string
  body: string
  fields: Record<string, string | undefined>
}

export const deliverEmail = async ({
  formspreeId,
  subject,
  replyTo,
  body,
  fields,
}: DeliverEmailArgs): Promise<EmailDeliveryChannel> => {
  if (formspreeId) {
    const formspreeOk = await postToFormspree(formspreeId, {
      _subject: subject,
      _replyto: replyTo,
      message: body,
      ...fields,
    })
    if (formspreeOk) return 'formspree'
  }

  const formSubmitOk = await postToFormSubmit({
    _subject: subject,
    _replyto: replyTo,
    message: body,
    ...fields,
  })
  if (formSubmitOk) return 'formsubmit'

  return openMailtoFallback(subject, body) ? 'mailto' : 'failed'
}
