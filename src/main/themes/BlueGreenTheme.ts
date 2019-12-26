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
    themePrimary: '#007399',
    themeLighterAlt: '#f1f8fb',
    themeLighter: '#c8e5ef',
    themeLight: '#9dd0e0',
    themeTertiary: '#4ea5c2',
    themeSecondary: '#1481a5',
    themeDarkAlt: '#00678a',
    themeDark: '#005774',
    themeDarker: '#004056',
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
