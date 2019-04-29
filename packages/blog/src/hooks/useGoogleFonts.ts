import { useEffect } from 'react'

export const useGoogleFonts = (url: string) => {
  useEffect(() => {
    fetch(url)
      .then(resp => resp.text())
      .then(text => {
        const css = text.replace(/}/g, 'font-display:swap;}')

        const node = document.createElement('style')

        node.textContent = css

        document.querySelector('head')!.appendChild(node)
      })
  }, [url])
}
