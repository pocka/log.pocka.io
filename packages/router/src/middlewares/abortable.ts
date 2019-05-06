import { Middleware } from '../'

export interface AbortableContext {
  signal: AbortSignal
}

export const abortable: Middleware<AbortableContext> = createRoute => (
  match,
  route
) =>
  createRoute(match, ctx => {
    const ctrl = new AbortController()
    const { signal } = ctrl

    const cleanup = route({ ...ctx, signal })

    return () => {
      if (!signal.aborted) {
        ctrl.abort()
      }

      if (cleanup) {
        cleanup()
      }
    }
  })

export default abortable
