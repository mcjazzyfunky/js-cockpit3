import { LightTheme, withStyle, useStyletron } from 'baseui'
import { StyleObject } from 'styletron-react'

type Theme = typeof LightTheme

export default function defineBaseUIStyles<A extends any[], S extends Record<string, StyleObject>>(
  getStyles: (theme: Theme, ...args: A) => S
): (...args: A) => { [K in keyof S]: string } {
  return function useStyles(...args) {
    const
      ret: any = {},
      [css, theme] = useStyletron(),
      styles = getStyles(theme, ...args),
      keys = Object.keys(styles)

    keys.forEach(key => {
      ret[key] = css(styles[key])
    })

    return ret
  }
}
