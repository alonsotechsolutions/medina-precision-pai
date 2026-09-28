import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import { toast } from 'sonner'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { FORMSPREE_NEWSLETTER_FORM_ID, deliverEmail } from '@/lib/email'
import type { EmailDeliveryChannel } from '@/lib/email'
import { BUSINESS_EMAIL } from '@/lib/site'
import { newsletterSchema } from '@/lib/validation'

export interface NewsletterSubscriber {
  email: string
  subscribedAt: string
}

interface NewsletterContextValue {
  email: string
  setEmail: (v: string) => void
  isSubmitting: boolean
  subscribers: NewsletterSubscriber[]
  submit: (e: React.FormEvent) => Promise<void>
}

const NewsletterContext = createContext<NewsletterContextValue | null>(null)

const sendNewsletterNotification = async (
  email: string,
  subscribedAtIso: string,
): Promise<EmailDeliveryChannel> => {
  const subject = `New Newsletter Subscriber: ${email}`
  const body = [
    'New newsletter subscriber',
    '',
    `Email: ${email}`,
    `Subscribed: ${new Date(subscribedAtIso).toLocaleString()}`,
    '',
    'Source: Website footer form',
  ].join('\n')

  return deliverEmail({
    formspreeId: FORMSPREE_NEWSLETTER_FORM_ID,
    subject,
    replyTo: email,
    body,
    fields: {
      email,
      subscribedAt: subscribedAtIso,
      source: 'website-newsletter-footer',
    },
  })
}

export const NewsletterProvider = ({ children }: { children: ReactNode }) => {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [subscribers, setSubscribers] = useLocalStorage<NewsletterSubscriber[]>(
    'newsletter-subscribers',
    [],
  )

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting) return

    const result = newsletterSchema.safeParse({ email })
    if (!result.success) {
      toast.error(result.error.issues[0]?.message || 'Please enter a valid email address')
      return
    }
    const cleaned = result.data.email.toLowerCase()

    const subscribedAt = new Date().toISOString()
    let isDuplicate = false

    setSubscribers(current => {
      const list = current || []
      if (list.some(s => s.email === cleaned)) {
        isDuplicate = true
        return list
      }
      return [{ email: cleaned, subscribedAt }, ...list]
    })

    if (isDuplicate) {
      toast.info("You're already subscribed!")
      return
    }

    setIsSubmitting(true)
    try {
      const channel = await sendNewsletterNotification(cleaned, subscribedAt)
      if (channel === 'formspree' || channel === 'formsubmit') {
        toast.success('Thanks for subscribing! You\'re on the list.')
      } else if (channel === 'mailto') {
        toast.info('Subscription saved. Please send the pre-filled email that opened.', {
          description: `If nothing opens, email us at ${BUSINESS_EMAIL}.`,
        })
      } else {
        toast.error('Subscription saved, but email delivery failed right now.')
      }

      setEmail('')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <NewsletterContext.Provider value={{ email, setEmail, isSubmitting, subscribers, submit }}>
      {children}
    </NewsletterContext.Provider>
  )
}

export const useNewsletter = (): NewsletterContextValue => {
  const ctx = useContext(NewsletterContext)
  if (!ctx) throw new Error('useNewsletter must be used inside a <NewsletterProvider>')
  return ctx
}
