// external imports
import React from 'react'
import { component } from 'js-react-utils'
import { TooltipHost } from '@fluentui/react'
import { MdPowerSettingsNew as LogoutIcon } from 'react-icons/md'
import * as Spec from 'js-spec/validators'

// internal import
import defineStyles from '../tools/defineStyles'
import useI18n from '../hooks/useI18n'

// --- components ----------------------------------------------------

const UserMenu = component({
  name: 'UserMenu',

  ...(process.env.NODE_ENV === ('development' as any) && {
    validate: Spec.lazy(() => validateUserMenuProps)
  }),

  main: UserMenuView
})

const UserIcon = component({
  name: 'UserIcon',
  memoize: true,

  main() {
    return (
      <svg version="1.1" width="22" height="22" viewBox="0 0 36 36">
        <g fill="white">
          <path d="M18,17a7,7,0,1,0-7-7A7,7,0,0,0,18,17ZM18,5a5,5,0,1,1-5,5A5,5,0,0,1,18,5Z" />
          <path d="M30.47,24.37a17.16,17.16,0,0,0-24.93,0A2,2,0,0,0,5,25.74V31a2,2,0,0,0,2,2H29a2,2,0,0,0,2-2V25.74A2,2,0,0,0,30.47,24.37ZM29,31H7V25.73a15.17,15.17,0,0,1,22,0h0Z" />
        </g>
      </svg>
    )
  }
})

// --- types ---------------------------------------------------------

type UserMenuProps = {
  displayName?: string
}

// --- validation ----------------------------------------------------

const validateUserMenuProps = Spec.checkProps<UserMenuProps>({
  optional: {
    displayName: Spec.string
  }
})

// --- styles --------------------------------------------------------

const useUserMenuStyles = defineStyles(theme => {
  return {
    root: {
      display: 'flex',
      whiteSpace: 'nowrap',
      padding: '.2rem 0',
      alignItems: 'center'
    },

    userIcon: {
      width: '24px',
      height: '24px'
    },

    displayName: {
      fontFamily: theme.fonts.medium.fontFamily,
      fontSize: '14px',
      margin: '0 14px 0 10px'
    },

    logoutButton: {
      width: '46px',
      height: '46px',
      border: 'none',
      color: theme.palette.white,
      backgroundColor: theme.palette.themeSecondary,
      outline: 'none',
      cursor: 'pointer',

      selectors: {
        ':hover': {
          backgroundColor: theme.palette.themePrimary
        },

        ':active': {
          backgroundColor: theme.palette.themeDarkAlt
        }
      }
    },

    logoutIcon: {
      width: '28px',
      height: '28px',
      marginTop: '2px'
    }
  }
})

// --- view ----------------------------------------------------------

function UserMenuView({ displayName }: UserMenuProps) {
  const { getText } = useI18n(),
    classes = useUserMenuStyles()

  return (
    <div className={classes.root}>
      <UserIcon className={classes.userIcon} />
      <div className={classes.displayName}>{displayName}</div>
      <TooltipHost content={getText('jsc.UserMenu.logOut', null, 'Log out')}>
        <button className={classes.logoutButton}>
          <LogoutIcon className={classes.logoutIcon} />
        </button>
      </TooltipHost>
    </div>
  )
}

// --- exports -------------------------------------------------------

export default UserMenu
