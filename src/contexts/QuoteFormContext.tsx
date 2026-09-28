import { createContext, useCallback, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import { toast } from 'sonner'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { FORMSPREE_QUOTE_FORM_ID, deliverEmail } from '@/lib/email'
import type { EmailDeliveryChannel } from '@/lib/email'
import { buildEmailBody, buildPaletteHtmlBlock, buildPrintUrl } from '@/lib/email-templates'
import { formatServices, getQuoteServices } from '@/lib/quote-helpers'
import { BUSINESS_EMAIL, BUSINESS_PHONE_DISPLAY } from '@/lib/site'
import { quoteFormSchema } from '@/lib/validation'
import { formatSwatchLabel } from '@/data/palettes'
import { BLANK_QUOTE_FORM } from '@/types/quote'
import type { QuoteFormData, QuoteRequest } from '@/types/quote'

interface QuoteFormContextValue {
  // Form state
  formData: QuoteFormData
  setFormData: React.Dispatch<React.SetStateAction<QuoteFormData>>
  isSubmitting: boolean
  isDialogOpen: boolean
  setIsDialogOpen: (open: boolean) => void
  openQuoteForm: (prefill?: Partial<QuoteFormData>) => void

  // Persistence
  quotes: QuoteRequest[]
  setQuotes: React.Dispatch<React.SetStateAction<QuoteRequest[]>>

  // Submit pipeline
  submitQuote: (e: React.FormEvent) => Promise<void>
}

const QuoteFormContext = createContext<QuoteFormContextValue | null>(null)

export const QuoteFormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<QuoteFormData>(BLANK_QUOTE_FORM)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [quotes, setQuotes] = useLocalStorage<QuoteRequest[]>('quote-requests', [])

  // Every entry point to the quote form (header button, hero CTA, floating
  // CTA, contact-section CTA, estimator "Get My Exact Price", and palette
  // cards) opens the dialog through this helper. It guarantees the form
  // always starts blank and is then prefilled with only the context for the
  // specific entry point — preventing stale data (e.g. an estimator summary
  // hanging around after the user backs out and clicks a palette).
  const openQuoteForm = useCallback((prefill?: Partial<QuoteFormData>) => {
    setFormData({ ...BLANK_QUOTE_FORM, ...(prefill ?? {}) })
    setIsDialogOpen(true)
  }, [])

  const sendEmailNotification = async (
    quote: QuoteRequest,
  ): Promise<EmailDeliveryChannel> => {
    const subject = `New Quote Request from ${quote.name}`
    const body = buildEmailBody(quote)

    const paletteFields: Record<string, string | undefined> = quote.selectedPalette
      ? {
          paletteName: quote.selectedPalette.name,
          paletteMood: quote.selectedPalette.mood,
          paletteColors: quote.selectedPalette.swatches.map(s => formatSwatchLabel(s)).join(', '),
          paletteSwatchHtml: buildPaletteHtmlBlock(quote.selectedPalette),
          palettePrintUrl: buildPrintUrl(quote.selectedPalette.slug),
        }
      : {}

    return deliverEmail({
      formspreeId: FORMSPREE_QUOTE_FORM_ID,
      subject,
      replyTo: quote.email,
      body,
      fields: {
        name: quote.name,
        email: quote.email,
        phone: quote.phone,
        address: quote.address,
        serviceTypes: formatServices(getQuoteServices(quote)),
        propertyType: quote.propertyType,
        preferredDate: quote.preferredDate,
        budgetRange: quote.budgetRange,
        referralSource: quote.referralSource,
        projectDescription: quote.projectDescription,
        submittedAt: quote.submittedAt,
        ...paletteFields,
      },
    })
  }

  const submitQuote = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting) return

    const result = quoteFormSchema.safeParse({
      ...formData,
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone.trim(),
      address: formData.address.trim(),
      projectDescription: formData.projectDescription.trim(),
    })
    if (!result.success) {
      toast.error(result.error.issues[0]?.message || 'Please review the quote form and try again')
      return
    }

    const cleaned = result.data
    const newQuote: QuoteRequest = {
      id: `quote-${Date.now()}`,
      name: cleaned.name,
      email: cleaned.email,
      phone: cleaned.phone,
      address: cleaned.address || '',
      serviceTypes: cleaned.serviceTypes,
      propertyType: cleaned.propertyType || '',
      projectDescription: cleaned.projectDescription || '',
      preferredDate: cleaned.preferredDate || '',
      budgetRange: cleaned.budgetRange || '',
      referralSource: cleaned.referralSource || '',
      selectedPalette: formData.selectedPalette,
      status: 'new',
      submittedAt: new Date().toISOString(),
    }

    setQuotes(currentQuotes => [newQuote, ...(currentQuotes || [])])

    setIsSubmitting(true)
    try {
      const channel = await sendEmailNotification(newQuote)

      if (channel === 'formspree' || channel === 'formsubmit') {
        toast.success('Quote request submitted! We\'ll contact you within 24 hours.')
      } else if (channel === 'mailto') {
        toast.info('Quote request saved. Please send the pre-filled email that opened.', {
          description: `If nothing opens, email us at ${BUSINESS_EMAIL}.`,
        })
      } else {
        toast.error(`Quote saved, but email delivery failed. Please call ${BUSINESS_PHONE_DISPLAY}.`)
      }

      setIsDialogOpen(false)
      setFormData(BLANK_QUOTE_FORM)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <QuoteFormContext.Provider
      value={{
        formData,
        setFormData,
        isSubmitting,
        isDialogOpen,
        setIsDialogOpen,
        openQuoteForm,
        quotes,
        setQuotes,
        submitQuote,
      }}
    >
      {children}
    </QuoteFormContext.Provider>
  )
}

export const useQuoteForm = (): QuoteFormContextValue => {
  const ctx = useContext(QuoteFormContext)
  if (!ctx) throw new Error('useQuoteForm must be used inside a <QuoteFormProvider>')
  return ctx
}
