/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { ContextType, SFC } from 'react'

import { BaseProps } from '~/components/BaseProps'
import { Theme } from '~/theme'

import { OpenStateContext } from './OpenStateContext'

interface Props extends BaseProps {
  title: string
}

const ctx: ContextType<typeof OpenStateContext> = [true, () => void 0]

export const RegularNavMenu: SFC<Props> = ({ children, title, ...rest }) => (
  <nav css={$nav} {...rest}>
    <h1 css={$title}>{title}</h1>
    <hr css={$separator} />
    <ul css={$links}>
      <OpenStateContext.Provider value={ctx}>
        {children}
      </OpenStateContext.Provider>
    </ul>
  </nav>
)

export default RegularNavMenu

const $nav = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  font-size: 1.6rem;

  text-align: right;
`

const $title = (theme: Theme) => css`
  margin: 0;
  font-size: inherit;

  color: ${theme.colors.primary};
  font-weight: normal;
`

const $separator = (theme: Theme) => css`
  margin: 0;
  margin-top: 1.6rem;
  padding: 0;
  outline: 0;
  border: 0 none;
  height: 0.1rem;

  background-image: linear-gradient(
    to bottom,
    transparent,
    ${theme.colors.border} 20%,
    ${theme.colors.border} 80%,
    transparent
  );
`

const $links = css`
  margin: 0;
  padding: 0;

  list-style: none;
`
