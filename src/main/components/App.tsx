// external imports
import React, { ReactNode } from 'react'
import { component, isNode } from 'js-react-utils'
import * as Spec from 'js-spec/validators'

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
      {children}
    </>
  )
}

// --- exports -------------------------------------------------------

export default App 
