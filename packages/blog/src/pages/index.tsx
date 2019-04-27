/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { SFC } from 'react'

import { NavMenu } from '~/components/organisms/NavMenu'

export const Home: SFC = () => {
  return (
    <div
      css={css`
        background-color: tomato;
      `}
    >
      Hello, World!
      <NavMenu title="foo" />
    </div>
  )
}

export default Home
