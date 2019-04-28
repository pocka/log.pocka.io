/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { ComponentType, ElementType, PropsWithoutRef, FC } from 'react'

interface OwnProps {
  level?: '1' | '2' | '3' | '4' | '5' | '6'
}

type InheritProps<T> = T extends ComponentType<infer P>
  ? PropsWithoutRef<P>
  : T extends keyof JSX.IntrinsicElements
  ? JSX.IntrinsicElements[T]
  : {}

type Props<T> = OwnProps &
  InheritProps<T> & {
    as: T
  }

export function Heading<T extends ElementType<any> = 'h1'>({
  as: comp,
  level = '1',
  ...rest
}: Props<T>): ReturnType<FC<Props<T>>> {
  const Component = comp || 'h' + level

  return <Component css={[$base, $heading[level]]} {...rest} />
}

export default Heading

const $base = css`
  margin: 0;
  line-height: 1.15;

  font-weight: 500;
`

const $heading = {
  '1': css`
    margin-top: 2.4rem;
    font-size: 2.4rem;
  `,
  '2': css`
    margin-top: 1.6rem;
    font-size: 2rem;
  `,
  '3': css`
    margin-top: 1.6rem;
    font-size: 1.8rem;
  `,
  '4': css`
    margin-top: 1.6rem;
    font-size: 1.6rem;
  `,
  '5': css`
    margin-top: 0.8rem;
    font-size: 1.4rem;
  `,
  '6': css`
    margin-top: 0.8rem;
    font-size: 1.2rem;
  `
}
