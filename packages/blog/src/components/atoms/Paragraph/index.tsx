/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { FC } from 'react'

type Props = JSX.IntrinsicElements['p']

export const Paragraph: FC<Props> = props => <p css={$paragraph} {...props} />

export default Paragraph

const $paragraph = css`
  margin-top: 1.6rem;
  font-size: 1.6rem;
  line-height: 1.15;

  font-weight: normal;

  &:first-child {
    margin-top: 0;
  }
`
