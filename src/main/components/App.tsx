// external imports
import React, { ReactNode } from 'react'
import { component, isNode } from 'js-react-utils'
import * as Spec from 'js-spec/validators'

import {Client as Styletron} from 'styletron-engine-atomic'
import {Provider as StyletronProvider} from 'styletron-react'

import { LightTheme, BaseProvider } from 'baseui'

// --- components ----------------------------------------------------

const App = component<AppProps>({
  displayName: 'App',
  
  ...process.env.NODE_ENV === 'development' as any
    ? { validate: Spec.lazy(() => validateAppProps) }
    : null,
 
  render: AppView
})

// --- types ---------------------------------------------------------

type AppProps = {
  children: ReactNode
}

// --- validation ----------------------------------------------------

const validateAppProps = Spec.checkProps({
  optional: {
    children: isNode
  }
})

// --- view ----------------------------------------------------------

function AppView({
  children
}: AppProps) {
  return (
    <>
      <style>
        {`
          body {
            margin: 0;
            padding: 0;
          }
        `}
      </style>
      <StyletronProvider value={engine}>
        <BaseProvider theme={LightTheme}>
          {children}
        </BaseProvider>
      </StyletronProvider>
    </>
  )
}

// --- misc ----------------------------------------------------------

const engine = new Styletron();

// --- exports -------------------------------------------------------

export default App 
