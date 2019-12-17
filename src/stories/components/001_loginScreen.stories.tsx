import React from 'react'
import { Brand, LoginScreen, Text, ClassicTheme, TealTheme } from '../js-cockpit'

export default {
  title: 'Login screen'
}

export const loginScreen = () =>
  <LoginScreen
    theme={ClassicTheme}

    slotHeader={
      <Brand
        vendor="meet&amp;greet"
        title="Back Office"
      />}

    slotFooter={<Text>&copy; 2019, meet+greet</Text>}
  />
