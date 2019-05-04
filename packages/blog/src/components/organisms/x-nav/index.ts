import { XElement } from '~/components/XElement'

import '~/components/atoms/x-hamburger/register'

import styles from './styles.pcss?inline'

export class XNav extends XElement {
  public static get observedAttributes() {
    return ['page-title']
  }

  public static tagName = 'x-nav'

  private isOpened: boolean = false

  private hamburgerNode: HTMLElement
  private menuNode: HTMLDivElement
  private titleNode: HTMLHeadingElement
  private backdropNode: HTMLDivElement
  private menus: HTMLSlotElement

  private cleanup?: () => void

  private get pageTitle() {
    return this.getAttribute('page-title') || document.title
  }

  constructor() {
    super()

    const shadow = this.attachShadow({ mode: 'open' })

    shadow.innerHTML = `
      <style>${styles}</style>

      <div class="navbar">
        <x-hamburger
          role="button"
          aria-label="Toggle navigation menu open state"
          tabindex="0"
        ></x-hamburger>
        <h1 class="title"></h1>
        <div class="spacer" aria-hidden="true"></div>
      </div>

      <div class="menu">
        <div class="spacer" aria-hidden="true"></div>
        <div class="items">
          <hr class="separator" aria-hidden="true"/>
          <slot/>
        </div>
        <div class="spacer" aria-hidden="true"></div>
      </div>

      <div class="backdrop" aria-hidden="true"></div>
    `

    this.hamburgerNode = shadow.querySelector('x-hamburger') as HTMLElement
    this.menuNode = shadow.querySelector('.menu') as HTMLDivElement
    this.titleNode = shadow.querySelector('h1')!
    this.backdropNode = shadow.querySelector('.backdrop') as HTMLDivElement
    this.menus = shadow.querySelector('slot')!
  }

  public attributeChangedCallback() {
    this.update()
  }

  public connectedCallback() {
    const toggleIsOpened = () => {
      this.setIsOpened(!this.isOpened)
    }

    this.hamburgerNode.addEventListener('click', toggleIsOpened)
    this.backdropNode.addEventListener('click', toggleIsOpened)

    const upMd = window.matchMedia('(min-width: 960px)')

    this.setIsOpened(upMd.matches)

    const setOpenStateByScreenSize = (mql: MediaQueryListEvent) => {
      this.setIsOpened(mql.matches)
    }

    upMd.addListener(setOpenStateByScreenSize)

    this.cleanup = () => {
      this.hamburgerNode.removeEventListener('click', toggleIsOpened)
      this.backdropNode.removeEventListener('click', toggleIsOpened)

      upMd.removeListener(setOpenStateByScreenSize)
    }

    this.update()
  }

  public disconnectedCallback() {
    if (this.cleanup) {
      this.cleanup()
    }
  }

  private update() {
    this.hamburgerNode.setAttribute('expanded', this.isOpened ? 'expanded' : '')
    this.menuNode.setAttribute('aria-hidden', `${!this.isOpened}`)
    this.backdropNode.dataset.active = this.isOpened ? 'active' : ''

    this.titleNode.textContent = this.pageTitle

    this.menus.assignedElements().map(el => {
      el.setAttribute('aria-disabled', this.isOpened ? 'false' : 'true')
      el.setAttribute('tabindex', this.isOpened ? '0' : '-1')
    })
  }

  private setIsOpened = (isOpened: boolean) => {
    this.isOpened = isOpened
    this.update()
  }
}

export default XNav
