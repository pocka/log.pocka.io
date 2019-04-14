import style from './style.scss'

export const NAME = 'x-hamburger'

export class XHamburger extends HTMLElement {
  constructor() {
    super()

    const shadow = this.attachShadow({ mode: 'open' })

    shadow.innerHTML = `
      <style>${style}</style>

      <i aria-hidden="true" class="bar"></i>
      <i aria-hidden="true" class="bar"></i>
      <i aria-hidden="true" class="bar"></i>
    `
  }
}

export default XHamburger

export const register = () => {
  if (!customElements.get(NAME)) {
    customElements.define(NAME, XHamburger)
  }
}
