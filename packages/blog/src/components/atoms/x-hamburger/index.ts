import { XElement } from '~/components/XElement'

import styles from './styles.pcss?inline'

export class XHamburger extends XElement {
  public static tagName = 'x-hamburger'

  constructor() {
    super()

    const shadow = this.attachShadow({ mode: 'open' })

    shadow.innerHTML = `
      <style>
        ${styles}
      </style>

      <i class="bar"></i>
      <i class="bar"></i>
      <i class="bar"></i>
    `
  }
}

export default XHamburger
