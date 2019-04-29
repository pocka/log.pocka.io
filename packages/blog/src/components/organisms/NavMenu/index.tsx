/** @jsx createElement */
import { createElement, ComponentType } from 'react'
import { withTheme } from 'emotion-theming'

import { useMedia } from 'use-media'

import { BaseProps } from '~/components/BaseProps'
import { down } from '~/misc/breakpoints'
import { Theme } from '~/theme'

import { CompactNavMenu } from './CompactNavMenu'
import { RegularNavMenu } from './RegularNavMenu'

interface Props extends BaseProps {
  title: string
  theme: Theme
}

export const NavMenu = withTheme<ComponentType<Props>>(({ theme, ...rest }) => {
  const isCompact = useMedia(`(${down(theme.breakpoints.md)})`, true)

  return isCompact ? <CompactNavMenu {...rest} /> : <RegularNavMenu {...rest} />
})

export default NavMenu

export { NavMenuItem } from './NavMenuItem'
