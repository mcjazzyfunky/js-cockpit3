// external imports
import React, { ReactNode } from 'react'
import { component, isNode } from 'js-react-utils'
import * as Spec from 'js-spec/validators'

// internal import
import defineStyles from '../tools/defineStyles'

// --- components ----------------------------------------------------

const Tab = component<TabProps>({
  displayName: 'Tab',

  ...process.env.NODE_ENV === 'development' as any
    ? { validate: Spec.lazy(() => validateTabProps) }
    : null,

  render: TabView
})

// --- types ---------------------------------------------------------

type TabProps = {
  title?: string,
  children?: ReactNode
}

// --- validation ----------------------------------------------------

const validateTabProps = Spec.checkProps({
  optional: {
    title: Spec.string,
    children: isNode
  }
})

// --- view ----------------------------------------------------------

function TabView({
}: TabProps): ReactNode {
  throw new Error('Components of type "Tab" can only be used as children '
    + 'of "Tabs" components') 
}

// --- exports -------------------------------------------------------

export default Tab
