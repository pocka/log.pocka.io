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
        <slot name="nav"/>
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
