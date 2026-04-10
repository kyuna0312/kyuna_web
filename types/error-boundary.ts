import type { ReactNode } from 'react'

export type ErrorBoundaryState = { hasError: boolean; error: Error | null }

export type ErrorBoundaryProps = { children?: ReactNode }

export type ErrorFallbackProps = { onReset?: () => void }
