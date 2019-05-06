export interface Context {
  isActive(): boolean

  matches: readonly string[]
}

export type CleanupFunction = () => void

export type Matcher =
  | string
  | RegExp
  | ((path: string) => [boolean, ...readonly string[]])

export interface Route<C extends Context = Context> {
  (ctx: C): CleanupFunction | void

  match?: Matcher
}

type CreateRoute<C extends Context, A = {}> = (
  match: Matcher,
  route: Route<C & A>
) => Route<C>

/**
 * Create route.
 *
 * @param match Match pattern/function to the current path.
 * @param route Route function.
 */
export const route: CreateRoute<Context> = (match, route) => {
  route.match = match

  return route
}

export type Middleware<AdditionalContext = {}, C extends Context = Context> = (
  createRoute: CreateRoute<C>
) => CreateRoute<C, AdditionalContext>

// Just for alias
type M<T> = Middleware<T>

// FIXME: wtf
export function compose<T>(arg: [M<T>]): M<T>
export function compose<T1, T2>(arg: [M<T1>, M<T2>]): M<T1 & T2>
export function compose<T1, T2, T3>(arg: [M<T1>, M<T2>, M<T3>]): M<T1 & T2 & T3>
export function compose<T1, T2, T3, T4>(
  arg: [M<T1>, M<T2>, M<T3>, M<T4>]
): M<T1 & T2 & T3 & T4>
export function compose<T1, T2, T3, T4, T5>(
  arg: [M<T1>, M<T2>, M<T3>, M<T4>, M<T5>]
): M<T1 & T2 & T3 & T4 & T5>

/**
 * Compose middlewares into one middleware.
 */
export function compose(middlewares: Middleware<any>[]): Middleware<any> {
  return createRoute => middlewares.reduce((c, m) => m(c), createRoute)
}

export interface RouterOptions {
  routes: readonly Route[]
}

type MatchResult = [Route, string[]]

export const router = ({ routes }: RouterOptions): void => {
  const getMatchedRoute = (path: string): MatchResult | null => {
    for (const r of routes) {
      if (!r.match) {
        return [r, []]
      }

      if (typeof r.match === 'function') {
        const res = r.match(path)

        if (typeof res === 'boolean' && res) {
          return [r, []]
        } else if (res[0]) {
          return [r, res.slice(1) as string[]]
        }
      } else {
        const res = path.match(r.match)

        if (res) {
          return [r, res]
        }
      }
    }

    return null
  }

  let cleanup: CleanupFunction | void

  const onStateChange = () => {
    if (cleanup) {
      cleanup()
    }

    const path = location.href.replace(location.origin, '')

    const matched = getMatchedRoute(path)

    if (matched) {
      const [route, matches] = matched

      let active = true

      const routeCleanup = route({
        isActive() {
          return active
        },
        matches
      })

      cleanup = () => {
        active = false
        routeCleanup && routeCleanup()
      }
    }
  }

  onStateChange()

  window.addEventListener('popstate', () => {
    onStateChange()
  })
}
