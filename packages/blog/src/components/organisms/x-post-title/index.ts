import { XElement } from '~/components/XElement'

import format from 'date-fns/format'

import '~/components/atoms/x-link/register'

import { history } from '~/icons'

import styles from './styles.pcss?inline'

export class XPostTitle extends XElement {
  public static tagName = 'x-post-title'

  public static get observedAttributes() {
    return ['updated-at', 'post-title', 'tags', 'href']
  }

  private updatedAtNode: HTMLTimeElement
  private postTitleNode: HTMLAnchorElement
  private tagsNode: HTMLDivElement

  private get updatedAt() {
    return this.getAttribute('updated-at') || ''
  }

  private get postTitle() {
    return this.getAttribute('post-title') || ''
  }

  private get tags() {
    return (this.getAttribute('tags') || '').split(',')
  }

  private get href() {
    return this.getAttribute('href') || ''
  }

  constructor() {
    super()

    const shadow = this.attachShadow({ mode: 'open' })

    shadow.innerHTML = `
      <style>${styles}</style>

      <span class="updated-at">
        ${history}
        <time></time>
      </span>

      <a is="x-link" class="title"></a>

      <div class="tags"></div>
    `

    this.updatedAtNode = shadow.querySelector('time')!
    this.postTitleNode = shadow.querySelector('a')!
    this.tagsNode = shadow.querySelector('div')!
  }

  public attributeChangedCallback() {
    this.update()
  }

  public connectedCallback() {
    this.update()
  }

  private update = () => {
    this.updatedAtNode.textContent = format(this.updatedAt, 'YYYY/MM/DD')
    this.postTitleNode.textContent = this.postTitle
    this.postTitleNode.setAttribute('href', this.href)
    this.tagsNode.innerHTML = this.tags
      .map(tag => `<a is="x-link" class="tag" href="/tags/${tag}/">${tag}</a>`)
      .join('')
  }
}

export default XPostTitle
