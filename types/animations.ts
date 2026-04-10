import type { ReactNode } from 'react'
import type { HTMLMotionProps } from 'framer-motion'
import type { Variant } from 'framer-motion'

/** Scroll wrapper variants (e.g. fadeInUp, fadeInDown from advanced-animations). */
export type FadeVariant = {
  hidden: Variant
  visible: Variant
}

export type ScrollAnimationWrapperProps = {
  children: ReactNode
  variant?: FadeVariant
  delay?: number
  threshold?: number
} & Omit<HTMLMotionProps<'div'>, 'children'>

export type StaggerAnimationWrapperProps = {
  children: ReactNode
  staggerDelay?: number
  initialDelay?: number
  threshold?: number
} & Omit<HTMLMotionProps<'div'>, 'children'>

export type ParallaxWrapperProps = {
  children: ReactNode
  offset?: number
  reverse?: boolean
} & Omit<HTMLMotionProps<'div'>, 'children'>

export type LoadingSpinnerProps = { size?: number; color?: string }

export type FloatingElementProps = {
  children: ReactNode
  duration?: number
  y?: number[]
} & Omit<HTMLMotionProps<'div'>, 'children'>

export type PulseElementProps = {
  children: ReactNode
  scale?: number[]
  duration?: number
} & Omit<HTMLMotionProps<'div'>, 'children'>

export type AnimatedTextProps = {
  text: string
  delay?: number
  duration?: number
} & Omit<HTMLMotionProps<'div'>, 'children'>
