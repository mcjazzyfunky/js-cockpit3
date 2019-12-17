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
    themePrimary: '#d75d30',
    themeLighterAlt: '#fdf8f5',
    themeLighter: '#f8e2d9',
    themeLight: '#f3c9ba',
    themeTertiary: '#e7977b',
    themeSecondary: '#db6d45',
    themeDarkAlt: '#c1532a',
    themeDark: '#a34624',
    themeDarker: '#78331a',
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
  }
})
