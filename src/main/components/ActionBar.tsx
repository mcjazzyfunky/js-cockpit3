// external imports
import React, { ReactNode } from 'react'
import { component, isNode } from 'js-react-utils'
import * as Spec from 'js-spec/validators'

import { ActionButton, DefaultButton } from 'office-ui-fabric-react'

// internal import
import defineStyles from '../tools/defineStyles'
import { icons } from 'react-icons/lib/cjs'

// --- components ----------------------------------------------------

const ActionBar = component<ActionBarProps>({
  displayName: 'ActionBar',
  
  ...process.env.NODE_ENV === 'development' as any
    ? { validate: Spec.lazy(() => validateActionBarProps) }
    : null,
 
  render: ActionBarView
})

// --- types ---------------------------------------------------------

type ActionBarProps = {
  actions: Action[]
}

type Action = {
  text: string,
  actionId: string,
  icon?: ReactNode
}

// --- validation ----------------------------------------------------

const validateActionBarProps = Spec.checkProps({
  optional: {
  }
})

// --- styles --------------------------------------------------------

const useActionBarStyles = defineStyles(theme => {
  return {
    root: {
    },

    actionButton: {
      selectors: {
        ':hover': {
          color: 'inherit',
          backgroundColor: theme.palette.neutralLight,
          borderRadius: 0
        },

        ':active': {
          color: 'inherit',
          backgroundColor: theme.palette.neutralQuaternary,
          borderRadius: 0
        }
      }
    },

    actionIcon: {
      //color: theme.palette.themePrimary,
      margin: '2px 1px 0 0',
    }
  }
})

// --- view ----------------------------------------------------------

function ActionBarView({
  actions
}: ActionBarProps) {
  const classes = useActionBarStyles()

  return (
    <div className={classes.root}>
      {
        actions.map(action => {
          return (
            <ActionButton
              className={classes.actionButton}

              onRenderIcon={
                action.icon
                  ? () =>
                      <div className={classes.actionIcon}>
                        {action.icon}
                      </div>
                  : undefined
              }
            >
              {action.text}
            </ActionButton>
          )
        })
      }
    </div>
  )
}

// --- exports -------------------------------------------------------

export default ActionBar