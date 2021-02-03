// external imports
import React, { ReactElement, ReactNode } from 'react'
import { convertValidation, isNode } from 'js-react-utils'
import * as Spec from 'js-spec/validators'

// --- types ---------------------------------------------------------

type TabProps = {
  title?: string
  children?: ReactNode
}

// --- validation ----------------------------------------------------

const validateTabProps = Spec.checkProps({
  optional: {
    title: Spec.string,
    children: isNode
  }
})

// --- components ----------------------------------------------------

function Tab({}: TabProps): ReactElement<any> {
  throw new Error(
    'Components of type "Tab" can only be used as children ' +
      'of "Tabs" components'
  )
}

Object.assign({
  displayName: 'Tab',

  ...(process.env.NODE_ENV === ('development' as string) &&
    convertValidation(validateTabProps))
})

// --- exports -------------------------------------------------------

export default Tab
