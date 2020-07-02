// external imports
import { createTheme } from '@fluentui/react'

// internal import
import { DEFAULT_FONT_FAMILY, DEFAULT_FONT_WEIGHT } from './theme-constants'

// --- theme ---------------------------------------------------------

export default createTheme({
  defaultFontStyle: {
    fontFamily: DEFAULT_FONT_FAMILY,
    fontWeight: DEFAULT_FONT_WEIGHT
  },

  palette: {
    themePrimary: '#b14dc2',
    themeLighterAlt: '#fcf6fd',
    themeLighter: '#f2def5',
    themeLight: '#e6c2ed',
    themeTertiary: '#ce8cda',
    themeSecondary: '#b95fc9',
    themeDarkAlt: '#9f46ae',
    themeDark: '#863b93',
    themeDarker: '#632b6d',
    neutralLighterAlt: '#f8f8f8',
    neutralLighter: '#f4f4f4',
    neutralLight: '#eaeaea',
    neutralQuaternaryAlt: '#dadada',
    neutralQuaternary: '#d0d0d0',
    neutralTertiaryAlt: '#c8c8c8',
    neutralTertiary: '#c2c2c2',
    neutralSecondary: '#858585',
    neutralPrimaryAlt: '#4b4b4b',
    neutralPrimary: '#333333',
    neutralDark: '#272727',
    black: '#1d1d1d',
    white: '#ffffff'
  }
})
