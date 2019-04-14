import style from './style.scss'

import * as XHamburger from '~/components/x-hamburger'

export const NAME = 'x-nav'

export class XNav extends HTMLElement {
  private isMenuOpen = false

  private toggleButton: HTMLAnchorElement
  private menuBody: HTMLDivElement
  private backdrop: HTMLDivElement

  constructor() {
    super()

    const shadow = this.attachShadow({ mode: 'open' })

    shadow.innerHTML = `
      <style>${style}</style>

      <x-hamburger
        class="toggle"
        aria-label="Toggle navigation menu"
        role="button"
      ></x-hamburger>

      <div class="body">
        <div class="body-contents">
          <div class="menu">
            <slot/>
          </div>
        </div>
        <svg class="body-bg" viewbox="0 0 200 50" preserveAspectRatio="none">
          <polygon points="0,0 200,0 200,30, 0,50"/>
        </svg>
      </div>

      <div aria-hidden="true" class="backdrop"></div>
    `

    this.toggleButton = shadow.querySelector('.toggle') as HTMLAnchorElement
    this.menuBody = shadow.querySelector('.body') as HTMLDivElement
    this.backdrop = shadow.querySelector('.backdrop') as HTMLDivElement
  }

  public connectedCallback() {
    this.toggleButton.addEventListener('click', this.toggleMenuOpen)
    this.backdrop.addEventListener('click', this.toggleMenuOpen)
  }

  public disconnectedCallback() {
    this.toggleButton.removeEventListener('click', this.toggleMenuOpen)
    this.backdrop.removeEventListener('click', this.toggleMenuOpen)
  }

  /**
   * Toggle whether menu is opened.
   * It also updates data-attributes of toggle button and menu body.
   */
  private toggleMenuOpen = () => {
    this.isMenuOpen = !this.isMenuOpen

    this.toggleButton.setAttribute(
      'expanded',
      this.isMenuOpen ? 'expanded' : ''
    )
    this.menuBody.dataset.expanded = this.isMenuOpen ? 'expanded' : ''
    this.backdrop.dataset.enabled = this.isMenuOpen ? 'enabled' : ''
  }
}

export default XNav

export const register = () => {
  XHamburger.register()

  if (!customElements.get(NAME)) {
    customElements.define(NAME, XNav)
  }
}
