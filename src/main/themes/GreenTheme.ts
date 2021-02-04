// external imports
import { createTheme } from '@fluentui/react'

// internal import
import { DEFAULT_FONT_FAMILY, DEFAULT_FONT_WEIGHT } from './theme-constants'

// === theme =========================================================

export default createTheme({
  defaultFontStyle: {
    fontFamily: DEFAULT_FONT_FAMILY,
    fontWeight: DEFAULT_FONT_WEIGHT
  },

  palette: {
    themePrimary: '#008272',
    themeLighterAlt: '#f0faf9',
    themeLighter: '#c5ebe7',
    themeLight: '#98dad2',
    themeTertiary: '#48b4a7',
    themeSecondary: '#119182',
    themeDarkAlt: '#007567',
    themeDark: '#006357',
    themeDarker: '#004940',
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
