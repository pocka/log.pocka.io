import style from './style.scss'

export const NAME = 'x-layout'

export class XLayout extends HTMLElement {
  constructor() {
    super()

    this.attachShadow({ mode: 'open' })

    this.render()
  }

  private render() {
    this.shadowRoot!.innerHTML = `
      <style>${style}</style>

      <div class="nav">
        <svg class="nav-bg" viewbox="0 0 200 50" preserveAspectRatio="none">
          <polygon points="0,0 200,0 200,30, 0,50"/>
        </svg>
        <div class="nav-contents">
          <slot name="nav"/>
        </div>
      </div>

      <div class="main">
        <div class="main-contents">
          <slot/>
        </div>
      </div>

      <div class="bottom-blur"></div>

      <div class="aside">
        <slot name="aside"/>
      </div>
    `
  }
}

export default XLayout

export const register = () => {
  if (!customElements.get(NAME)) {
    customElements.define(NAME, XLayout)
  }
}
