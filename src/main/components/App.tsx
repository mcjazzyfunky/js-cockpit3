// external imports
import React, { ReactNode } from 'react'
import { component, isNode } from 'js-react-utils'
import * as Spec from 'js-spec/validators'

import { Fabric, Customizer, ITheme } from 'office-ui-fabric-react';

// --- components ----------------------------------------------------

const App = component<AppProps>({
  name: 'App',
  
  ...process.env.NODE_ENV === 'development' as any
    ? { validate: Spec.lazy(() => validateAppProps) }
    : null,
 
  main: AppView
})

// --- types ---------------------------------------------------------

type AppProps = {
  theme?: ITheme,
  children?: ReactNode
}

// --- validation ----------------------------------------------------

const validateAppProps = Spec.checkProps({
  optional: {
    theme: Spec.object,
    children: isNode
  }
})

// --- view ----------------------------------------------------------

function AppView({
  theme,
  children
}: AppProps) {
  return !theme
    ? children
    : <Customizer settings={{ theme }}>
        <Fabric>
           {children}
        </Fabric>
      </Customizer>
}



// --- exports -------------------------------------------------------

export default App 
