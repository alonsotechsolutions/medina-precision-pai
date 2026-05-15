import type { Icon } from '@phosphor-icons/react'
import { Clock, Medal, PaintBrush, Sparkle } from '@phosphor-icons/react'

export interface StatItem {
  value: string
  label: string
  icon: Icon
}

export const stats: StatItem[] = [
  { value: '5+', label: 'Years of Experience', icon: Medal },
  { value: '150+', label: 'Projects Completed', icon: PaintBrush },
  { value: '100%', label: 'Satisfaction Promise', icon: Sparkle },
  { value: '24hr', label: 'Quote Response Time', icon: Clock },
]
