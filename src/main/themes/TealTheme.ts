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
    themePrimary: '#03a1a1',
    themeLighterAlt: '#f1fbfb',
    themeLighter: '#caf0f0',
    themeLight: '#a0e3e3',
    themeTertiary: '#52c6c6',
    themeSecondary: '#18acac',
    themeDarkAlt: '#039191',
    themeDark: '#027a7a',
    themeDarker: '#025a5a',
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
    white: '#ffffff',
    redDark: '#d44204'
  }
})
