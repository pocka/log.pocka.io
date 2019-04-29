declare module 'next-page-transitions' {
  import { ComponentType, ElementType, ReactElement } from 'react'

  export const PageTransition: ComponentType<{
    classNames: string
    tag?: ElementType<any>
    timeout: number
    loadingComponent?: ReactElement<any>
    loadingDelay?: number
    loadingCallbackName?: string
    loadingTimeout?: number
    loadingClassNames?: string
    monkeyPatchScrolling?: boolean
    skipInitialTransition?: boolean
  }>
}
