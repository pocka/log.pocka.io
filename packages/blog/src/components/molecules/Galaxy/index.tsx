/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import {
  Children,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  CSSProperties,
  FC,
  ReactNode
} from 'react'

import { BaseProps } from '~/components/BaseProps'

import { getPosition, degreeToRadian } from './math'

interface Props extends BaseProps {
  radius?: CSSProperties['width']

  degree?: number

  centerItem?: ReactNode
}

export const Galaxy: FC<Props> = ({
  children,
  radius = '50%',
  degree = 360,
  centerItem,
  style,
  ...rest
}) => {
  const containerStyles = useMemo<CSSProperties>(
    () => ({
      width: `calc(${radius} * 2)`,
      height: `calc(${radius} * 2)`,
      ...style
    }),
    [radius, style]
  )

  const container = useRef<HTMLDivElement>(null)
  const [radiusPx, setRadiusPx] = useState<number>(0)

  useLayoutEffect(() => {
    if (!container.current) {
      return
    }

    const { width, height } = container.current.getBoundingClientRect()

    setRadiusPx(Math.min(width, height) / 2)
  }, [radius, container.current])

  const count = Children.count(children)
  const interval = degree / count

  const childNodes = useMemo(() => {
    return Children.map(children, (child, i) => {
      const [x, y] = getPosition(radiusPx, degreeToRadian(interval * i - 90))

      const childStyle: CSSProperties = {
        transform: `translate(-50%, -50%) translate(${-x}px, ${y}px)`
      }

      return (
        <div css={$child} style={childStyle}>
          {child}
        </div>
      )
    })
  }, [count, interval, radiusPx])

  return (
    <div ref={container} css={$container} style={containerStyles} {...rest}>
      {childNodes}
      {centerItem && <div css={$centerItem}>{centerItem}</div>}
    </div>
  )
}

export default Galaxy

const $container = css`
  position: relative;
`

const $child = css`
  position: absolute;
  top: 50%;
  left: 50%;
`

const $centerItem = css`
  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);
`
