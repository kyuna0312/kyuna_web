import type { ReactNode } from 'react'
import type { BoxProps } from '@chakra-ui/react'
import type { HTMLMotionProps } from 'framer-motion'

export type TiltCardProps = {
  children: ReactNode
  tiltStrength?: number
  scale?: number
  perspective?: number
  glareEffect?: boolean
  shadow?: boolean
  className?: string
} & Omit<BoxProps, 'children' | 'shadow'>

export type RippleParticle = {
  id: number
  x: number
  y: number
  size: number
}

export type RippleEffectProps = {
  color?: string
  duration?: number
  size?: number
} & Omit<BoxProps, 'children'>

export type MagneticButtonProps = {
  children: ReactNode
  magnetStrength?: number
  maxDistance?: number
} & Omit<BoxProps, 'children'>

export type ParallaxElementProps = {
  children: ReactNode
  offset?: number
  speed?: number
  className?: string
} & Omit<BoxProps, 'children'>

export type FloatingActionButtonProps = {
  children: ReactNode
  amplitude?: number
  duration?: number
  delay?: number
  className?: string
} & Omit<BoxProps, 'children'>

export type HoverCardProps = {
  children: ReactNode
  hoverScale?: number
  rotateOnHover?: boolean
  glowEffect?: boolean
  shadowEffect?: boolean
  className?: string
} & Omit<BoxProps, 'children'>

export type TextRevealProps = {
  children: ReactNode
  delay?: number
  duration?: number
  staggerChildren?: number
  className?: string
} & Omit<HTMLMotionProps<'div'>, 'children'>

export type LiquidButtonProps = {
  children: ReactNode
  liquidColor?: string
  intensity?: number
  className?: string
} & Omit<BoxProps, 'children'>

export type MorphingShapeProps = {
  shapes?: string[]
  duration?: number
  delay?: number
  size?: number
  color?: string
} & Omit<BoxProps, 'children'>
