import { Middleware } from '../'

export interface ContainerContext<E> {
  container: E
}

export const container = <E extends Element>(
  el: E
): Middleware<ContainerContext<E>> => createRoute => {
  const initialState = el.innerHTML

  return (match, route) =>
    createRoute(match, ctx => {
      const cleanup = route({ ...ctx, container: el })

      return () => {
        cleanup && cleanup()
        el.innerHTML = initialState
      }
    })
}

export default container
