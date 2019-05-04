import { XElement } from '~/components/XElement'

import { getPosition, degreeToRadian } from './math'

import styles from './styles.pcss?inline'

export class XCircular extends XElement {
  static tagName = 'x-circular'

  static get observedAttributes() {
    return ['degree', 'radius']
  }

  constructor() {
    super()

    const shadow = this.attachShadow({ mode: 'open' })

    // Required in order to get elements count
    shadow.innerHTML = '<slot/>'
  }

  private get degree() {
    return parseInt(this.getAttribute('degree') || '360')
  }

  private get radius() {
    return this.getAttribute('radius') || '50%'
  }

  private get items() {
    const slot = this.shadowRoot!.querySelector('slot')!

    return [...slot.assignedElements()]
  }

  public attributeChangedCallback() {
    this.render()
  }

  public connectedCallback() {
    this.render()
  }

  private render() {
    if (!this.shadowRoot) return

    const { radius: specifiedRadius, items } = this

    // Set container size then obtain its pixel sizes.
    // This causes force-layout, but this is unavoidable.
    this.style.width = `calc(${specifiedRadius} * 2)`
    this.style.height = `calc(${specifiedRadius} * 2)`

    const { width, height } = this.getBoundingClientRect()

    const radius = Math.min(width, height) / 2

    // Avoid zero dividing
    const count = items.length || 1

    const interval = this.degree / (this.degree === 360 ? count : count - 1)

    const itemStyles = items
      .map((_, i) => {
        const [x, y] = getPosition(radius, degreeToRadian(interval * i - 90))

        return `
        ::slotted(:nth-child(${i + 1})) {
          transform: translate(-50%, -50%) translate(${-x}px, ${y}px);
        }
      `
      })
      .join('')

    this.shadowRoot.innerHTML = `
      <style>${styles}</style>

      <style>${itemStyles}</style>

      <slot />
    `
  }
}

export default XCircular
