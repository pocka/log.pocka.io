export interface Theme {
  colors: {
    primary: string
    secondary: string

    bg: string
    fg: string
    fgSub: string
    fgLight: string

    border: string
  }
  breakpoints: {
    sm: number
    md: number
    lg: number
    xl: number
  }
}

export const light: Theme = {
  colors: {
    primary: '#405818',
    secondary: '#EFCB68',

    bg: '#EFF1F3',
    fg: '#231C07',
    fgSub: '#635D49',
    fgLight: '#C5C5C5',

    border: '#B4AF9D'
  },
  breakpoints: {
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920
  }
}
