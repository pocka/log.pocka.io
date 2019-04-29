/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Fragment, FC } from 'react'

import { BaseProps } from '~/components/BaseProps'
import { down, up } from '~/misc/breakpoints'
import { Theme } from '~/theme'

import { CompactNavMenu } from './CompactNavMenu'
import { RegularNavMenu } from './RegularNavMenu'

interface Props extends BaseProps {
  title: string
}

export const NavMenu: FC<Props> = (({ ...rest }) => {
  return <Fragment>
    <CompactNavMenu css={$compact} {...rest}/>
    <RegularNavMenu css={$regular} {...rest}/>
  </Fragment>
})

export default NavMenu

export { NavMenuItem } from './NavMenuItem'

const $compact = (theme: Theme) => css`
  @media (${up(theme.breakpoints.md)}) {
    display: none;
  }
`

const $regular = (theme: Theme) => css`
  @media (${down(theme.breakpoints.md)}) {
    display: none;
  }
`