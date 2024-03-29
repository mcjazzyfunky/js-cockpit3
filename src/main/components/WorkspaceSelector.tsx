// external imports
import React, { ReactNode, Key } from 'react'
import { addComponentMeta, isNode } from 'js-react-utils'
import * as Spec from 'js-spec/validators'
import { css } from '@fluentui/react'

// internal import
import defineStyles from '../tools/defineStyles'

// === types =========================================================

type WorkspaceSelectorProps = {
  menu: WorkspaceSelectorItems
}

type WorkspaceSelectorItems = {
  type: 'items'
  items: WorkspaceSelectorItem[]
  activeItemId?: string
}

type WorkspaceSelectorItem = {
  type: 'item'
  itemId: string
  text: string
  description?: string
}

type Classes = ReturnType<typeof useWorkspaceSelectorStyles>

// === validation ====================================================

const validateWorkspaceSelectorProps = Spec.checkProps({
  required: {
    menu: Spec.lazy(() => validateWorkspaceSelectorItems)
  }
})

const validateWorkspaceSelectorItems = Spec.exact({
  type: Spec.is('items'),
  activeItemId: Spec.nullableOptional(Spec.string),
  items: Spec.arrayOf(Spec.lazy(() => validateWorkspaceSelectorItem))
})

const validateWorkspaceSelectorItem = Spec.exact({
  type: Spec.is('item'),
  itemId: Spec.string,
  text: Spec.string,
  description: Spec.optional(Spec.string)
})

// === styles ========================================================

const useWorkspaceSelectorStyles = defineStyles((theme) => {
  return {
    root: {
      whiteSpace: 'nowrap'
    },

    menuIcon: {
      display: 'inline-block',
      color: theme.palette.themeSecondary,
      margin: '0 8px'
    },

    workspaceLink: {
      fontFamily: theme.fonts.medium.fontFamily,
      padding: '11px 10px',
      margin: '0 2px'
    },

    workspaceLinkInactive: {
      cursor: 'pointer',
      fontWeight: 'normal',

      selectors: {
        ':hover': {
          backgroundColor: theme.palette.themeSecondary,
          borderRadius: '1px'
        }
      }
    },

    workspaceLinkActive: {
      fontWeight: 650,
      borderColor: theme.palette.themeSecondary,
      borderWidth: '0 0 3px 0',
      borderStyle: 'solid'
    }
  }
})

// === components ====================================================

function WorkspaceSelector({ menu }: WorkspaceSelectorProps) {
  const classes = useWorkspaceSelectorStyles()

  if (!menu) {
    return null
  }

  return (
    <div className={classes.root}>
      <div className={classes.menuIcon}>
        <WorkspaceSelectorIcon />
      </div>
      {menu.items.map((item, idx) =>
        renderWorkspaceLink(item, menu.activeItemId, classes, idx)
      )}
    </div>
  )
}

addComponentMeta(WorkspaceSelector, {
  name: 'WorkspaceSelector',

  validation:
    process.env.NODE_ENV === ('development' as string) &&
    validateWorkspaceSelectorProps
})

function renderWorkspaceLink(
  item: WorkspaceSelectorItem,
  activeItemId: string | undefined,
  classes: Classes,
  key: Key
) {
  const active =
      typeof activeItemId === 'string' && item.itemId === activeItemId,
    className = css(
      classes.workspaceLink,
      active ? classes.workspaceLinkActive : classes.workspaceLinkInactive
    )

  const link = (
    <a className={className} key={key}>
      {item.text}
    </a>
  )

  return link
}

function WorkspaceSelectorIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 64 64">
      <g fill="currentColor">
        <path d="M 0 0 L 0 26 L 26 26 L 26 0 Z" />
        <path d="M 0 37 L 0 63 L 26 63 L 26 37 Z" />
        <path d="M 37 0 L 37 26 L 63 26 L 63 0 Z" />
        <path d="M 37 37 L 37 63 L 63 63 L 63 37 Z" />
      </g>
    </svg>
  )
}

// === exports =======================================================

export default WorkspaceSelector
