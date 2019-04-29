/** @jsx jsx */
import { css, Global, jsx } from '@emotion/core'
import { Fragment, useMemo, FC } from 'react'

import { PageTransition as NextPageTransition } from 'next-page-transitions'

interface Props {
  timeout?: number

  classNameBase?: string
}

export const PageTransition: FC<Props> = ({
  children,
  classNameBase = 'page-transition',
  timeout = 200
}) => {
  const styles = useMemo(
    () => [
      css`
        .${classNameBase} {
          &-enter {
            opacity: 0;
          }

          &-enter-active {
            opacity: 1;
            transition: opacity ${timeout}ms ease;
          }

          &-exit {
            opacity: 1;
          }

          &-exit-active {
            opacity: 0;
            transition: opacity ${timeout} ms ease;
          }
        }
      `
    ],
    [classNameBase, timeout]
  )

  return (
    <Fragment>
      <Global styles={styles} />
      <NextPageTransition timeout={timeout} classNames={classNameBase}>
        {children}
      </NextPageTransition>
    </Fragment>
  )
}

export default PageTransition
