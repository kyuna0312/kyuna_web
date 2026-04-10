import type { ReactNode } from 'react'
import type { NextRouter } from 'next/router'
import type { SEOHeadProps } from './seo'

export type MainLayoutProps = {
  children: ReactNode
  router: NextRouter
}

export type ArticleLayoutProps = {
  children: ReactNode
} & Partial<Pick<SEOHeadProps, 'title' | 'description' | 'image'>>
