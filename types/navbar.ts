import type { ReactNode, ElementType } from 'react'
import type { LinkProps as NextLinkProps } from 'next/link'
import type { LinkProps as ChakraLinkProps } from '@chakra-ui/react'

export type LinkItemProps = Omit<ChakraLinkProps, 'href'> & {
  href: NextLinkProps['href']
  path: string
  target?: string
  children?: ReactNode
  icon?: ElementType
}

export type MenuLinkProps = Omit<ChakraLinkProps, 'href'> & {
  href: NextLinkProps['href']
}

export type NavbarProps = { path: string; id?: string }
