import type { ElementType } from 'react'

export type TimelineItem = {
  year: string
  title: string
  description: string
}

export type ElegantTimelineProps = { items?: TimelineItem[] }

export type ElegantTimelineItemProps = TimelineItem & {
  delay?: number
  emoji?: string
  isLast?: boolean
}

export type ElegantSocialLink = { href: string; icon: ElementType }
