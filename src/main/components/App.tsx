// external imports
import React, { ReactNode } from 'react'
import { convertValidation, isNode } from 'js-react-utils'
import * as Spec from 'js-spec/validators'
import { Fabric, Customizer, ITheme } from '@fluentui/react'

// --- types ---------------------------------------------------------

type AppProps = {
  theme?: ITheme
  children?: ReactNode
}

// --- validation ----------------------------------------------------

const validateAppProps = Spec.checkProps({
  optional: {
    theme: Spec.object,
    children: isNode
  }
})

// --- components ----------------------------------------------------

function App({ theme, children }: AppProps) {
  return !theme ? (
    children
  ) : (
    <Customizer settings={{ theme }}>
      <Fabric>{children}</Fabric>
    </Customizer>
  )
}

Object.assign(App, {
  displayName: 'App',

  ...(process.env.NODE_ENV === ('development' as string) &&
    convertValidation(validateAppProps))
})

// --- exports -------------------------------------------------------

export default App
