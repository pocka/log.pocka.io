import { CSSProperties } from 'react'

/**
 * Base props every components should inherit
 */
export interface BaseProps {
  className?: string
  style?: CSSProperties
}