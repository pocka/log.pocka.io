export abstract class XElement extends HTMLElement {
  public static tagName = ''

  public static register(
    component: typeof XElement,
    name: string = component.tagName
  ) {
    if (process.env.NODE_ENV === 'development') {
      if (component === XElement) {
        console.error('[XElement] Do not call XElement.register directly.')
      }

      if (component.tagName === XElement.tagName) {
        console.error('[XElement] Please set <YourElement>.tagName.')
      }
    }

    if (!customElements.get(name)) {
      customElements.define(name, component)
    }
  }
}

export default XElement
