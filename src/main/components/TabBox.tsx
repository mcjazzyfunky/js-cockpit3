// external imports
import React, { ReactNode } from 'react'
import { component, isNode, isElementOfType, withChildren } from 'js-react-utils'
import * as Spec from 'js-spec/validators'

import { Pivot, PivotItem } from 'office-ui-fabric-react'

// internal import
import defineStyles from '../tools/defineStyles'
import TabPage from './TabPage'

// derived imports
const { Children } = React

// --- components ----------------------------------------------------

const TabBox = component<TabBoxProps>({
  displayName: 'TabBox',
  
  ...process.env.NODE_ENV === 'development' as any
    ? { validate: Spec.lazy(() => validateTabBoxProps) }
    : null,
 
  render: TabBoxView
})

// --- types ---------------------------------------------------------

type TabBoxProps = {
  children: ReactNode
}

// --- validation ----------------------------------------------------

const validateTabBoxProps = Spec.checkProps({
  optional: {
    children: withChildren(Spec.all(isElementOfType(TabPage)))
  }
})

// --- styles --------------------------------------------------------

const useTabBoxStyles = defineStyles(theme => {
  return {
    root: {
    },
  }
})

// --- view ----------------------------------------------------------

function TabBoxView({
  children
}: TabBoxProps) {
  const classes = useTabBoxStyles()

  const tabsOverrides: any = {
    TabBar: {
      style: ({ $theme }: any) => ({
        //background: 'none',
        //borderWidth: '0 0 .5px 0',
        //borderStyle: 'solid',
        //borderColor: $theme.borders.border300.borderColor
      })
    },

    TabContent: {
      style: {
        paddingLeft: '8px',
        paddingRight: '8px',
      }
    }
  }

  const tabOverrides: any = {
    Tab: {
      style: ({ $theme }: any) => ({
        padding: 0,
        margin: 0,
        paddingTop: $theme.sizing.scale400,
        paddingBottom: $theme.sizing.scale400
      })
    }
  }

  // Children.map would modify keys
  const pages: ReactNode[] = []

  Children.forEach(children, (page: any, idx) => {
    pages.push(
      <PivotItem key={idx} headerText={page.props.title}>
        {page.props.children}
      </PivotItem>
    )
  })

  return (
    <Pivot>
      {pages}
    </Pivot>
  )
}

// --- exports -------------------------------------------------------

export default TabBox