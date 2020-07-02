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
    themePrimary: '#4f738f',
    themeLighterAlt: '#f6f9fb',
    themeLighter: '#dce6ed',
    themeLight: '#bfd0dd',
    themeTertiary: '#89a6bc',
    themeSecondary: '#5e819c',
    themeDarkAlt: '#476781',
    themeDark: '#3c576d',
    themeDarker: '#2c4050',
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
    white: '#ffffff',
    redDark: '#d44204'
  }
})
