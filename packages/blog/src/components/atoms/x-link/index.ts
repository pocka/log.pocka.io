import { isRelative, normalize } from '~/misc/url'

export class XLink extends HTMLAnchorElement {
  public static tagName = 'x-link'

  public static register(isRetry?: boolean) {
    try {
      if (!customElements.get(XLink.tagName)) {
        customElements.define(XLink.tagName, XLink, { extends: 'a' })
      }
    } catch (e) {
      if (!isRetry) {
        import('@ungap/custom-elements-builtin').then(() => {
          XLink.register(true)
        })
      }
    }
  }

  private cleanup?: () => any

  private get isRelative() {
    return isRelative(this.getAttribute('href') || '')
  }

  private get path() {
    return normalize(this.getAttribute('href') || '')
  }

  public connectedCallback() {
    const unregisterOnClick = this.registerOnClick()
    const unregisterOnKeyPress = this.registerOnKeyPress()
    const unregisterOnTouch = this.registerOnTouch()

    if (this.isRelative) {
      this.setAttribute('href', this.path)
    }

    this.cleanup = () => {
      unregisterOnClick()
      unregisterOnKeyPress()
      unregisterOnTouch()
    }
  }

  public disconnectedCallback() {
    if (this.cleanup) {
      this.cleanup()
    }
  }

  private registerOnClick() {
    const listener = (ev: MouseEvent) => {
      if (!this.isRelative || ev.button === 1 || ev.ctrlKey || ev.shiftKey) {
        return
      }

      ev.preventDefault()

      this.navigate()
    }

    this.addEventListener('click', listener)

    return () => {
      this.removeEventListener('click', listener)
    }
  }

  private registerOnKeyPress() {
    const listener = (ev: KeyboardEvent) => {
      if (
        !this.isRelative ||
        ev.ctrlKey ||
        ev.shiftKey ||
        ev.code !== 'Enter'
      ) {
        return
      }

      ev.preventDefault()

      this.navigate()
    }

    this.addEventListener('keypress', listener)

    return () => {
      this.removeEventListener('keypress', listener)
    }
  }

  private registerOnTouch() {
    const listener = (ev: TouchEvent) => {
      if (!this.isRelative) return

      ev.preventDefault()

      this.navigate()
    }

    this.addEventListener('touchend', listener)

    return () => {
      this.removeEventListener('touchend', listener)
    }
  }

  private navigate() {
    if (this.path === location.pathname) return

    const state = {}

    history.pushState(state, this.path, this.path)
    window.dispatchEvent(new PopStateEvent('popstate', { state }))
  }
}

export default XLink
