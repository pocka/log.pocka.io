/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import Link from 'next/link'
import { memo } from 'react'

import { format } from 'date-fns'

import { BaseProps } from '~/components/BaseProps'
import { Theme } from '~/theme'

import { Heading } from '~/components/atoms/Heading'

import { FaHistory } from 'react-icons/fa'

interface Props extends BaseProps {
  title: string
  updatedAt: Date | string
  tags: ReadonlyArray<string>
  url: string
}

export const PostTitle = memo<Props>(
  ({ title, updatedAt, tags, url, ...rest }) => {
    return (
      <div css={$container} {...rest}>
        <span css={$date}>
          <FaHistory />
          <time>{format(updatedAt, 'YYYY/MM/DD')}</time>
        </span>
        <Link href={url} passHref>
          <Heading css={$title} level="1" as="a">
            {title}
          </Heading>
        </Link>
        <div css={$tags}>
          {tags.map(tag => (
            <Link key={tag} href={`/tags/${tag}/`} passHref>
              <a css={$tag}>{tag}</a>
            </Link>
          ))}
        </div>
      </div>
    )
  }
)

export default PostTitle

const $container = css`
  font-size: 1.6rem;
`

const $date = (theme: Theme) => css`
  line-height: 1;

  color: ${theme.colors.fgSub};

  & > * {
    vertical-align: middle;
  }

  & > :not(:first-child) {
    margin-left: 0.8rem;
  }
`

const $title = (theme: Theme) => css`
  margin-top: 0.8rem;

  color: ${theme.colors.fg};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

const $tags = css`
  margin-top: 1.6rem;
  margin-left: -0.5em;
`

const $tag = (theme: Theme) => css`
  margin-left: 0.5em;

  color: ${theme.colors.primary};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  &::before {
    content: '#';
  }
`
