// external imports
import React from 'react'
import { getTheme, ITheme, CustomizerContext } from 'office-ui-fabric-react'

// derived imports
const { useContext } = React

export default function useTheme(): ITheme {
  const
      customizer = useContext(CustomizerContext),

      theme = (customizer
        && customizer.customizations
        && customizer.customizations.settings
        && customizer.customizations.settings.theme) || getTheme()

  return theme
}