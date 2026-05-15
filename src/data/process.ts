import type { Icon } from '@phosphor-icons/react'
import {
  ChatCircleText,
  CheckCircle,
  ClipboardText,
  PaintBrush,
  Wrench,
} from '@phosphor-icons/react'

export interface ProcessStep {
  icon: Icon
  title: string
  desc: string
}

export const processSteps: ProcessStep[] = [
  {
    icon: ChatCircleText,
    title: 'Free Consultation',
    desc: 'Tell us about your project online or by phone — we respond within 24 hours.',
  },
  {
    icon: ClipboardText,
    title: 'On-Site Estimate',
    desc: 'Eddie visits your property, measures, and provides a written, transparent quote with no hidden fees.',
  },
  {
    icon: Wrench,
    title: 'Prep & Protect',
    desc: 'Surfaces are cleaned, repaired, and primed. Floors, fixtures, and landscaping are carefully protected.',
  },
  {
    icon: PaintBrush,
    title: 'Precision Painting',
    desc: 'Premium paints applied with expert technique for a flawless, long-lasting finish on every surface.',
  },
  {
    icon: CheckCircle,
    title: 'Final Walkthrough',
    desc: 'We walk every inch with you to confirm perfection — backed by our 2-year workmanship warranty.',
  },
]
