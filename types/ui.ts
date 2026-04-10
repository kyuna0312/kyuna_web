import type { ReactNode, CSSProperties, SyntheticEvent } from 'react'
import type { BoxProps } from '@chakra-ui/react'

export type OptimizedImageProps = {
  src: string
  alt?: string
  width?: number
  height?: number
  priority?: boolean
  quality?: number
  objectFit?: string
  objectPosition?: string
  borderRadius?: number | string
  onLoad?: (_e: SyntheticEvent<HTMLImageElement>) => void
  onError?: () => void
  fallbackSrc?: string
  className?: string
  style?: CSSProperties
  sizes?: string
  fill?: boolean
} & Omit<BoxProps, 'as' | 'children' | 'fill' | 'width' | 'height'>

export type ResponsiveContainerProps = {
  children: ReactNode
  maxWidth?: BoxProps['maxW']
  padding?: BoxProps['px']
  paddingTop?: BoxProps['pt']
  paddingBottom?: BoxProps['pb']
  margin?: BoxProps['m']
} & Omit<BoxProps, 'children'>
