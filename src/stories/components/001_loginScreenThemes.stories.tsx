import React from 'react'

import { ITheme } from 'office-ui-fabric-react'
import { Brand, LoginScreen, Text,
  DefaultTheme, ClassicTheme, BlueTheme, BlueGreenTheme, GreenTheme, OrangeTheme, VioletTheme, TealTheme
} from '../js-cockpit'

export default {
  title: 'Login screen - Themes'
}

function renderLoginScreen(theme: ITheme = DefaultTheme) {
  return <LoginScreen
    theme={theme}

    performLogin={data => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject('Invalid username and password')
        }, 3000)
      })
    }}

    slotHeader={
      <Brand
        vendor="meet&amp;greet"
        title="Back Office"
      />}

    slotFooter={<Text>&copy; 2019, meet+greet</Text>}
  />
 }

export const loginScreen = () => renderLoginScreen()
export const loginScreenClassic = () => renderLoginScreen(ClassicTheme)
export const loginScreenBlue = () => renderLoginScreen(BlueTheme)
export const loginScreenBlueGreen = () => renderLoginScreen(BlueGreenTheme)
export const loginScreenOrange = () => renderLoginScreen(OrangeTheme)
export const loginScreenGreen = () => renderLoginScreen(GreenTheme)
export const loginScreenViolet = () => renderLoginScreen(VioletTheme)
export const loginScreenTeal = () => renderLoginScreen(TealTheme)
