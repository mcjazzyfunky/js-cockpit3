// external imports
import React, { Key } from 'react'
import { convertValidation } from 'js-react-utils'
import * as Spec from 'js-spec/validators'

// internal import
import defineStyles from '../tools/defineStyles'
import classNames from '../tools/classNames'

// --- types ---------------------------------------------------------

type SideMenuProps = {
  menu: SideMenuGroups
}

type SideMenuGroups = {
  type: 'groups'
  groups: SideMenuGroupLevel0[]
  activeItemId?: string | null
}

type SideMenuGroupLevel0 = {
  type: 'group'
  title: string
  items: (SideMenuGroupLevel1 | SideMenuItem)[]
}

type SideMenuGroupLevel1 = {
  type: 'group'
  title: string
  items: SideMenuItem[]
}

type SideMenuItem = {
  type: 'item'
  title: string
  itemId?: string
}

type Classes = ReturnType<typeof useSideMenuStyles>

// --- validation ----------------------------------------------------

const validateSideMenuProps = Spec.checkProps({
  required: {
    menu: Spec.any // TODO
  }
})
/*

const validateSideMenuGroups = Spec.exact({
  type: Spec.is('groups'),
  group: Spec.arrayOf(
    Spec.and(
      type: Spec.oneOf('group', 'item'),
      Spec.or(
        {
          when: Spec.prop(Spec.is('group')),
          then: Spec.exact({
            type: Spec.is('group')
          })
        }
      )
    )
  )
})
type SideMenuProps = {
  menu: SideMenuGroups
}

type SideMenuGroups = {
  type: 'groups',
  groups: SideMenuGroup
}

type SideMenuGroup = {
  type: 'group',
  title: string,
  items?: (SideMenuGroup | SideMenuItem)[]
}

type SideMenuItem = {
  type: 'item',
  title: string,
  itemId?: string
}
*/
// --- styles --------------------------------------------------------

const useSideMenuStyles = defineStyles((theme) => {
  return {
    root: {
      height: '100%',
      padding: '10px 0 10px 1px',
      borderWidth: '0 .5px 0 0',
      borderStyle: 'solid',
      backgroundColor: theme.palette.neutralLighterAlt,
      borderColor: theme.palette.neutralQuaternaryAlt,
      margin: '0',
      boxSizing: 'border-box'
    },

    groupTitle: {
      textTransform: 'uppercase',
      fontFamily: theme.fonts.large.fontFamily,
      fontWeight: 600,
      padding: '0 20px'
    },

    groupTitleLevel0: {
      fontFamily: theme.fonts.large.fontFamily,
      paddingLeft: '20px',
      margin: '5px 0'
    },

    groupTitleLevel1: {
      fontFamily: theme.fonts.large.fontFamily,
      padding: '3px 40px 0 40px'
    },

    itemList: {
      fontFamily: theme.fonts.medium.fontFamily,
      listStyle: 'none',
      margin: '0 0 6px 0',
      padding: 0
    },

    item: {
      fontFamily: theme.fonts.medium.fontFamily,
      fontWeight: 'normal'
    },

    itemLevel0: {
      padding: '6px 35px'
    },

    itemLevel1: {
      padding: '6px 60px'
    },

    itemInactive: {
      cursor: 'pointer',

      selectors: {
        ':hover': {
          backgroundColor: theme.palette.neutralQuaternaryAlt
        },

        ':active': {
          backgroundColor: theme.palette.neutralQuaternary
        }
      }
    },

    itemActive: {
      backgroundColor: theme.palette.neutralQuaternaryAlt,
      //backgroundColor: theme.palette.themeLight,
      borderWidth: '0 0 0 3px',
      borderColor: theme.palette.themeSecondary,
      borderStyle: 'solid'
    }
  }
})

// --- components ----------------------------------------------------

function SideMenu({ menu }: SideMenuProps) {
  const classes = useSideMenuStyles()

  const activeItemId = menu.activeItemId,
    groups = menu.groups

  return (
    <div className={classes.root}>
      <ul className={classes.itemList}>
        {groups.map((group, idx) => {
          return renderSideMenuGroup(group, 0, activeItemId, idx, classes)
        })}
      </ul>
    </div>
  )
}

function renderSideMenuGroup(
  group: SideMenuGroupLevel0,
  level: number,
  activeItemId: string | undefined | null,
  key: Key,
  classes: Classes
) {
  const classTitle = classNames(
    classes.groupTitle,
    level === 0 ? classes.groupTitleLevel0 : classes.groupTitleLevel1
  )

  return (
    <li key={key}>
      <div className={classTitle}>{group.title}</div>
      <ul className={classes.itemList}>
        {group.items.map((it, idx) => {
          return it.type === 'item'
            ? renderSideMenuItem(it, level, activeItemId, idx, classes)
            : renderSideMenuGroup(it, level + 1, activeItemId, idx, classes)
        })}
      </ul>
    </li>
  )
}

Object.assign(SideMenu, {
  displayName: 'SideMenu',

  ...(process.env.NODE_ENV === ('development' as string) &&
    convertValidation(validateSideMenuProps))
})

function renderSideMenuItem(
  item: SideMenuItem,
  level: number,
  activeItemId: string | null | undefined,
  key: Key,
  classes: Classes
) {
  const className = classNames(
    classes.item,
    level === 0 ? classes.itemLevel0 : classes.itemLevel1,
    typeof activeItemId === 'string' &&
      activeItemId.length > 0 &&
      activeItemId === item.itemId
      ? classes.itemActive
      : classes.itemInactive
  )

  return (
    <li className={className} key={key}>
      <a>{item.title}</a>
    </li>
  )
}

// --- exports -------------------------------------------------------

export default SideMenu
