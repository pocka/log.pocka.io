import { useCallback, useState } from 'react'

type UseToggle = (initialState: boolean) => [boolean, () => void]

export const useToggle: UseToggle = initialState => {
  const [state, setState] = useState(initialState)

  const toggle = useCallback(() => setState(prev => !prev), [setState])

  return [state, toggle]
}

export default useToggle
