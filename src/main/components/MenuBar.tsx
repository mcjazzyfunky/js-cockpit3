// external imports
import React, { ReactNode } from 'react'
import { component, isNode } from 'js-react-utils'
import * as Spec from 'js-spec/validators'

import { CommandBar, CommandBarButton, ICommandBarItemProps, IComponentAs, IButtonProps }
  from 'office-ui-fabric-react'

// internal import
import defineStyles from '../tools/defineStyles'

// --- components ----------------------------------------------------

const MenuBar = component<MenuBarProps>({
  displayName: 'MenuBar',
  
  ...process.env.NODE_ENV === 'development' as any
    ? { validate: Spec.lazy(() => validateMenuBarProps) }
    : null,
 
  render: MenuBarView
})

// --- types ---------------------------------------------------------

type MenuBarProps = {
  items: (Menu | Item | Divider)[],
  onAction?: (ev: ActionEvent) => void
}

type Menu = {
  type: 'menu',
  id: string, 
  text: string,
  items: (Menu | Item | Divider)[] 
}

type Item = {
  type: 'item',
  id: string,
  text: string,
  disabled?: boolean,
  onAction?: (ev: ActionEvent) => void
}

type Divider = {
  type: 'divider'
}

type ActionEvent = any // TODO

// --- validation ----------------------------------------------------

const validateMenuBarProps = Spec.checkProps({
  optional: {
  }
})

// --- styles --------------------------------------------------------

const useMenuBarStyles = defineStyles(theme => {
  return {
    root: {
      position: 'relative',
      width: '100%',
//      backgroundColor: theme.colors.mono400,
      borderWidth: '0 0 .5px 0',
//      borderColor: theme.colors.mono500,
      borderStyle: 'solid',
      
      selectors: {
        '& *': {
    //      backgroundColor: 'transparent !important',
          border: 'none !important',
    //      ...theme.typography.font200,
//          fontFamily: theme.typography.font200.fontFamily + ' !important',
        },

        '& [role=menubar]': {
          height: '36px !important'
        },

        '& .ms-Button-flexContainer:hover': {
    //      backgroundColor: theme.colors.mono500 + ' !important'
        },

        '& .ms-Icon': {
        //  color: theme.colors.primary + ' !important'
        },

        '& .ms-ContextualMenu *': {
    //      backgroundColor: 'red'
        }
      },
    },

    inner: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },

    commandBar: {
      borderWidth: '0 0 1px 0',
      borderStyle: 'solid',
//      borderColor:  '#888', 
      flex: 1,
    }
  }
})

// --- view ----------------------------------------------------------

function MenuBarView({
  items,
  onAction
}: MenuBarProps) {
 
 let
    ret = null,
    buttonAs: IComponentAs<IButtonProps>

  const
    classes = useMenuBarStyles(),
    itemCount = items.length

  buttonAs = props => 
    <CommandBarButton 
      {...props}

      menuProps={{
        ...props.menuProps,
        isBeakVisible: true,
        gapSpace: -6
      } as any}
    />

  if (itemCount > 0) {

    ret =
      <div data-component="MenuBar" className={classes.root}>
        <div className={classes.inner}>
          <CommandBar
            className={classes.commandBar}
            items={getItemProps(items, onAction)}
            buttonAs={buttonAs}
          />
        </div>
      </div>
  }

  return ret
}

// --- locals --------------------------------------------------------

//type Item = MenuBarViewProps['items'] extends (infer I)[] ? I : never

function getItemProps(
  items: (Menu | Item | Divider)[],
  baseOnAction?: (ev: ActionEvent) => void
): ICommandBarItemProps[] {
  const ret: ICommandBarItemProps[] = []

  for (let i = 0; i < items.length; ++i) {
    const
      child = items[i],
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
          }
        }
        break
      
      case 'item': {
        const
          id = child.id,
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
        throw new Error('This should never happen')
    }

    ret.push(item)
  }

  return ret
}

// --- exports -------------------------------------------------------

export default MenuBar
