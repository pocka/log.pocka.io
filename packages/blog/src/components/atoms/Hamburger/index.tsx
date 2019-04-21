/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { SFC } from 'react'

import { BaseProps } from '~/components/BaseProps'

interface Props extends BaseProps {
  expanded?: boolean

  onClick?(): any
}

export const Hamburger: SFC<Props> = ({ expanded, ...rest }) => {
  return (
    <i aria-hidden="true" css={$container} {...rest}>
      {[1, 2, 3].map(n => (
        <i css={[$bar, expanded && $expanded]} key={n} />
      ))}
    </i>
  )
}

export default Hamburger

const MENU_SIZE = 1
const BAR_HEIGHT = 1 / 6

const $container = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: ${MENU_SIZE}em;
  height: ${MENU_SIZE}em;

  vertical-align: text-top;
`

const $bar = css`
  display: block;
  width: 100%;
  height: ${BAR_HEIGHT}em;

  border-radius: 1px;
  background-color: currentColor;

  transition: transform 0.15s ease, opacity 0.15s ease;
`

const OFFSET_Y = MENU_SIZE / 2 - BAR_HEIGHT / 1.75

const $expanded = css`
  &:first-of-type {
    transform: translateY(${OFFSET_Y}em) rotate(45deg);
  }

  &:nth-of-type(2) {
    transform: rotate(-45deg);
    opacity: 0;
  }

  &:last-of-type {
    transform: translateY(-${OFFSET_Y}em) rotate(-45deg);
  }
`
