// external imports
import React, { ReactNode } from 'react'
import { component, isNode } from 'js-react-utils'
import * as Spec from 'js-spec/validators'

// internal import
import defineBaseUIStyles from '../tools/defineBaseUIStyles'

// --- components ----------------------------------------------------

const UserMenu = component<UserMenuProps>({
  displayName: 'UserMenu',
  
  ...process.env.NODE_ENV === 'development' as any
    ? { validate: Spec.lazy(() => validateUserMenuProps) }
    : null,
  
    render: UserMenuView
})

const UserIcon = component({
  displayName: 'UserIcon',

  render() {
    return (
      <svg version="1.1" width="22" height="22"  viewBox="0 0 36 36">
        <g fill="white">
          <path d="M18,17a7,7,0,1,0-7-7A7,7,0,0,0,18,17ZM18,5a5,5,0,1,1-5,5A5,5,0,0,1,18,5Z"/>
          <path d="M30.47,24.37a17.16,17.16,0,0,0-24.93,0A2,2,0,0,0,5,25.74V31a2,2,0,0,0,2,2H29a2,2,0,0,0,2-2V25.74A2,2,0,0,0,30.47,24.37ZM29,31H7V25.73a15.17,15.17,0,0,1,22,0h0Z"/>
        </g>
      </svg>
    )
  }
})

// --- types ---------------------------------------------------------

type UserMenuProps = {
  displayName?: string,
}

// --- validation ----------------------------------------------------

const validateUserMenuProps = Spec.checkProps({
  optional: {
    displayName: Spec.string
  }
})

// --- styles --------------------------------------------------------

const useUserMenuStyles = defineBaseUIStyles(theme => {
  return {
    root: {
      display: 'flex',
      whiteSpace: 'nowrap',
      padding: '.2rem .5rem',
      alignItems: 'center'
    },

    icon: {
      width: '24px',
      height: '24px',
    },

    displayName: {
      ...theme.typography.font250,
      margin: '0 14px 0 10px'
    }
  }
})

// --- view ----------------------------------------------------------

function UserMenuView({
  displayName
}: UserMenuProps) {
  const classes = useUserMenuStyles()

  return (
    <div className={classes.root}>
      <UserIcon className={classes.icon}/>
      <div className={classes.displayName}>{displayName}</div>
    </div>
  )
}

// --- exports -------------------------------------------------------

export default UserMenu 
