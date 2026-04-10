export type DecoPositionProps = {
  delay?: number
  size?: string
  top?: string | number
  left?: string | number
  right?: string | number
  bottom?: string | number
}

export type CuteProjectCardProps = {
  title: string
  description: string
  thumbnail: string
  url?: string
  github?: string
  tech?: string[]
  featured?: boolean
}
