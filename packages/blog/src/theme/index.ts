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
  }
}
