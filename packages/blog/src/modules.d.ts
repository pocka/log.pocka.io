declare module '*.pcss?critical' {
  const e: never

  export default e
}

declare module '*.pcss' {
  const modules: {
    [className: string]: string
  }

  export default modules
}

declare module '*.pcss?inline' {
  const css: string

  export default css
}

declare module '*.svg' {
  const svg: string

  export default svg
}
