// external imports
import { createTheme } from 'office-ui-fabric-react'

// internal import
import { DEFAULT_FONT_FAMILY, DEFAULT_FONT_WEIGHT } from './theme-constants'

// --- theme ---------------------------------------------------------

export default createTheme({
  defaultFontStyle: {
    fontFamily: DEFAULT_FONT_FAMILY,
    fontWeight: DEFAULT_FONT_WEIGHT 
  },

  palette: {
    themePrimary: '#c94a2a',
    themeLighterAlt: '#fdf6f5',
    themeLighter: '#f6ded7',
    themeLight: '#efc2b6',
    themeTertiary: '#df8a75',
    themeSecondary: '#d05c3f',
    themeDarkAlt: '#b54326',
    themeDark: '#993820',
    themeDarker: '#712a18',
    neutralLighterAlt: '#f8f8f8',
    neutralLighter: '#f4f4f4',
    neutralLight: '#eaeaea',
    neutralQuaternaryAlt: '#dadada',
    neutralQuaternary: '#d0d0d0',
    neutralTertiaryAlt: '#c8c8c8',
    neutralTertiary: '#bab8b7',
    neutralSecondary: '#a3a2a0',
    neutralPrimaryAlt: '#8d8b8a',
    neutralPrimary: '#323130',
    neutralDark: '#605e5d',
    black: '#494847',
    white: '#ffffff'
  }
})
