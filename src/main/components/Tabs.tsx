// external imports
import React, { ReactNode } from 'react'

import {
  convertValidation,
  isNode,
  isElementOfType,
  withChildren
} from 'js-react-utils'

import * as Spec from 'js-spec/validators'

import { Pivot, PivotItem } from '@fluentui/react'

// internal import
import defineStyles from '../tools/defineStyles'
import Tab from './Tab'

// derived imports
const { Children } = React

// --- types ---------------------------------------------------------

type TabsProps = {
  children: ReactNode
}

// --- validation ----------------------------------------------------

const validateTabsProps = Spec.checkProps({
  optional: {
    children: withChildren(Spec.all(isElementOfType(Tab)))
  }
})

// --- styles --------------------------------------------------------

const useTabsStyles = defineStyles((theme) => {
  return {
    root: {}
  }
})

// --- components ----------------------------------------------------

function Tabs({ children }: TabsProps) {
  const classes = useTabsStyles()

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
    <div data-component="jsc:Tabs" className={classes.root}>
      <Pivot>{pages}</Pivot>
    </div>
  )
}

Object.assign(Tabs, {
  displayName: 'Tabs',

  ...(process.env.NODE_ENV === ('development' as string) &&
    convertValidation(validateTabsProps))
})

// --- exports -------------------------------------------------------

export default Tabs
