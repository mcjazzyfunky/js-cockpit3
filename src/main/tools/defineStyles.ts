// external imports
import React from 'react'

import {
  ITheme,
  mergeStyleSets,
  IStyleSet,
  memoizeFunction
} from '@fluentui/react'

// internal imports
import useTheme from '../hooks/useTheme'

// derived imports
const { useContext } = React

export default function defineStyles<A extends any[], S extends IStyleSet<any>>(
  getStyles: (theme: ITheme, ...args: A) => S
): (...args: A) => { [K in keyof S]: string } {
  // TODO: Memoize!!!!!!!!!
  return (...args: any[]) => {
    const theme = useTheme(),
      styleSets = getStyles(theme, ...(args as any))

    return mergeStyleSets(styleSets) as any
  }
}
