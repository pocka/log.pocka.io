import { XElement } from '~/components/XElement'

import '~/components/atoms/x-link/register'

import { logo } from '~/icons'

import styles from './styles.pcss?inline'

export class XTemplate extends XElement {
  public static tagName = 'x-template'

  public static get observedAttribures() {
    return ['hide-logo']
  }

  private logoContainer: HTMLDivElement

  constructor() {
    super()

    const shadow = this.attachShadow({ mode: 'open' })

    shadow.innerHTML = `
      <style>${styles}</style>

      <slot class="nav" name="nav"></slot>

      <div class="main">
        <div class="contents">
          <slot></slot>
        </div>
      </div>

      <div class="logo-container">
        <a is="x-link" class="logo-link" href="/" aria-label="Go to top page">
          ${logo}
        </a>
      </div>

      <div class="dim dim-top"></div>
      <div class="dim dim-bottom"></div>
    `

    this.logoContainer = shadow.querySelector(
      '.logo-container'
    ) as HTMLDivElement
  }

  public connectedCallback() {
    this.update()
  }

  public attributeChangedCallback() {
    this.update()
  }

  private update() {
    const hideLogo = this.getAttribute('hide-logo') === 'true'

    this.logoContainer.setAttribute('aria-hidden', `${hideLogo}`)
    this.logoContainer.setAttribute('aria-disabled', `${hideLogo}`)
  }
}

export default XTemplate
