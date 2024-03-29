// external imports
import React, { ReactNode } from 'react'
import { addComponentMeta, isNode } from 'js-react-utils'
import * as Spec from 'js-spec/validators'

import {
  CommandBar,
  CommandBarButton,
  ICommandBarItemProps,
  IComponentAs,
  IButtonProps
} from '@fluentui/react'

// internal import
import defineStyles from '../tools/defineStyles'

// === types =========================================================

type MenuBarProps = {
  items: (Menu | Item | Divider)[]
  onAction?: (ev: ActionEvent) => void
}

type Menu = {
  type: 'menu'
  id: string
  text: string
  items: (Menu | Item | Divider)[]
}

type Item = {
  type: 'item'
  id: string
  text: string
  disabled?: boolean
  onAction?: (ev: ActionEvent) => void
}

type Divider = {
  type: 'divider'
}

type ActionEvent = any // TODO

// === validation ====================================================

const validateMenuBarProps = Spec.checkProps({
  optional: {}
})

// === styles ========================================================

const useMenuBarStyles = defineStyles((theme) => {
  return {
    root: {
      position: 'relative',
      width: '100%',
      borderWidth: '0 0 .5px 0',
      borderColor: theme.palette.neutralTertiary,
      backgroundColor: theme.palette.neutralQuaternaryAlt,
      borderStyle: 'solid',

      selectors: {
        '& *': {
          backgroundColor: 'transparent !important',
          border: 'none !important',
          fontFamily: theme.fonts.medium.fontFamily + ' !important'
        },

        '& [role=menubar]': {
          height: '34px !important'
        },

        '& .ms-Button-flexContainer:hover': {
          backgroundColor: theme.palette.neutralTertiary + ' !important'
        }
      }
    },

    inner: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    },

    commandBar: {
      borderWidth: '0 0 1px 0',
      borderStyle: 'solid',
      //      borderColor:  '#888',
      flex: 1
    }
  }
})

// === components ====================================================

function MenuBar({ items, onAction }: MenuBarProps) {
  let ret = null,
    buttonAs: IComponentAs<IButtonProps>

  const classes = useMenuBarStyles(),
    itemCount = items.length

  buttonAs = (props) => (
    <CommandBarButton
      {...props}
      menuIconProps={{
        iconName: 'jsc:chevronDown'
      }}
      menuProps={
        {
          ...props.menuProps,
          isBeakVisible: true,
          gapSpace: -6
        } as any
      }
    />
  )

  if (itemCount > 0) {
    ret = (
      <div data-component="jsc:MenuBar" className={classes.root}>
        <div className={classes.inner}>
          <CommandBar
            className={classes.commandBar}
            items={getItemProps(items, onAction)}
            buttonAs={buttonAs}
          />
        </div>
      </div>
    )
  }

  return ret
}

addComponentMeta(MenuBar, {
  name: 'MenuBar',

  validation:
    process.env.NODE_ENV === ('development' as string) && validateMenuBarProps
})

// === locals ========================================================

//type Item = MenuBarViewProps['items'] extends (infer I)[] ? I : never

function getItemProps(
  items: (Menu | Item | Divider)[],
  baseOnAction?: (ev: ActionEvent) => void
): ICommandBarItemProps[] {
  const ret: ICommandBarItemProps[] = []

  for (let i = 0; i < items.length; ++i) {
    const child = items[i],
      type = child.type

    let item: ICommandBarItemProps

    switch (child.type) {
      case 'divider':
        item = {
          key: `[divider-${i}]`,
          text: '-'
        }
        break

      case 'menu':
        item = {
          key: `[menu-${i}]`,
          text: child.text,

          subMenuProps: {
            items: getItemProps(child.items, baseOnAction)
          },

          submenuIconProps: {
            iconName: 'jsc:chevronRight'
          }
        }
        break

      case 'item': {
        const id = child.id,
          childOnAction = child.onAction

        let onClick: (() => void) | undefined

        if (childOnAction || baseOnAction) {
          const event: ActionEvent = {
            type: 'action',
            kind: 'command',
            id
          }

          onClick = () => {
            if (childOnAction) {
              childOnAction(event)
            }

            if (baseOnAction) {
              baseOnAction(event)
            }
          }
        }

        item = {
          key: child.id,
          text: child.text,
          onClick
        }

        break
      }

      default:
        throw new Error('[MenuBar] This should never happen')
    }

    ret.push(item)
  }

  return ret
}

// === exports =======================================================

export default MenuBar
