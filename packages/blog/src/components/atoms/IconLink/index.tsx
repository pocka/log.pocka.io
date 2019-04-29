/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import Link from 'next/link'
import { useMemo, FC } from 'react'

import { BaseProps } from '~/components/BaseProps'
import { Theme } from '~/theme'

interface Props extends BaseProps {
  href: string

  label: string
}

export const IconLink: FC<Props> = ({ children, href, label, ...rest }) => {
  const isExternalLink = useMemo(() => href.match(/^https?:\/\//), [href])

  return isExternalLink ? (
    <a css={$link} href={href} target="_blank" title={label} {...rest}>
      {children}
    </a>
  ) : (
    <Link href={href} passHref>
      <a css={$link} title={label} {...rest}>
        {children}
      </a>
    </Link>
  )
}

export default IconLink

const $link = (theme: Theme) => css`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 1em;
  height: 1em;

  border-radius: 50%;
  color: inherit;
  background-color: currentColor;

  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }

  &:focus {
    box-shadow: 0 0.05em 0.1em rgba(0, 0, 0, 0.25);
    outline: none;

    transform: translateY(-0.1em);
  }

  & > :first-of-type {
    font-size: 0.5em;

    color: ${theme.colors.bg};
  }
`
