import { createContext } from 'react'

export const OpenStateContext = createContext<[boolean, () => void]>([
  false,
  () => void 0
])
