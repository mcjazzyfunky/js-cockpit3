import { mergeStyleSets, IStyleSet, memoizeFunction } from 'office-ui-fabric-react'
import { LightTheme, useStyletron } from 'baseui'

type Theme = typeof LightTheme

export default function defineStyles<A extends any[], S extends IStyleSet<any>>(
  getStyle: (theme: Theme, ...args: A) => S
): (...args: A) => { [K in keyof S]: string } {
  
//  return memoizeFunction((...args: any[]) => {
  return ((...args: any[]) => { // TODO memoize
    const [, theme] = useStyletron()
    const styleSets = getStyle(theme, ...args as any)

    return mergeStyleSets(styleSets) as any
  }) 
}
