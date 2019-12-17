import React from 'react'
import { App, Brand, LoginScreen, Text, TealTheme } from '../js-cockpit'

export default {
  title: 'Login screen'
}

export const loginScreen = () =>
  <App>
    <LoginScreen
      theme={TealTheme}

      slotHeader={
        <Brand
          vendor="meet&amp;greet"
          title="Back Office"
        />}

      slotFooter={<Text>&copy; 2019, meet+greet</Text>}
    />
  </App>
