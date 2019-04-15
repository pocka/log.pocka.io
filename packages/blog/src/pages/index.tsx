/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useCallback, useState, SFC } from 'react'

import { Hamburger } from '~/components/atoms/Hamburger'

export const Home: SFC = () => {
  const [open, setOpen] = useState(false)

  const toggle = useCallback(() => setOpen(prev => !prev), [setOpen])

  return (
    <div
      css={css`
        background-color: tomato;
      `}
    >
      Hello, World!
      <Hamburger expanded={open} onClick={toggle} />
    </div>
  )
}

export default Home
