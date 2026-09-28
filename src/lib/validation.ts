import { z } from 'zod'

const phonePattern = /^[+\d()\s.-]{10,20}$/

export const newsletterSchema = z.object({
  email: z.string().trim().email('Please enter a valid email address'),
})

export const quoteFormSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name').max(80, 'Name is too long'),
  email: z.string().trim().email('Please enter a valid email address'),
  phone: z.string().trim().regex(phonePattern, 'Please enter a valid phone number'),
  address: z.string().trim().max(160, 'Address is too long').optional().or(z.literal('')),
  serviceTypes: z.array(z.string()).min(1, 'Please select at least one service'),
  propertyType: z.string().trim().max(40, 'Property type is too long').optional().or(z.literal('')),
  projectDescription: z.string().trim().max(1500, 'Project description is too long').optional().or(z.literal('')),
  preferredDate: z.string().optional().or(z.literal('')),
  budgetRange: z.string().trim().max(40, 'Budget range is too long').optional().or(z.literal('')),
  referralSource: z.string().trim().max(40, 'Referral source is too long').optional().or(z.literal('')),
})

export type NewsletterInput = z.infer<typeof newsletterSchema>
export type QuoteFormInput = z.infer<typeof quoteFormSchema>
