// external imports
import React, { ReactNode } from 'react'
import { component, isNode } from 'js-react-utils'
import * as Spec from 'js-spec/validators'

// internal import
import defineStyles from '../tools/defineStyles'

// --- components ----------------------------------------------------

const TabPage = component<TabPageProps>({
  displayName: 'TabPage',

  ...process.env.NODE_ENV === 'development' as any
    ? { validate: Spec.lazy(() => validateTabPageProps) }
    : null,

  render: TabPageView
})

// --- types ---------------------------------------------------------

type TabPageProps = {
  title?: string,
  children?: ReactNode
}

// --- validation ----------------------------------------------------

const validateTabPageProps = Spec.checkProps({
  optional: {
    title: Spec.string,
    children: isNode
  }
})

// --- view ----------------------------------------------------------

function TabPageView({
}: TabPageProps): ReactNode {
  throw new Error('Components of type "TabPage" can only be used as children '
    + 'of "TabBox" components') 
}

// --- exports -------------------------------------------------------

export default TabPage
