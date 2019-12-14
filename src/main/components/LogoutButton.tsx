// external imports
import React, { ReactNode } from 'react'
import { component, isNode } from 'js-react-utils'
import * as Spec from 'js-spec/validators'
import { StatefulTooltip, PLACEMENT } from 'baseui/tooltip'
import { MdPowerSettingsNew as LogoutIcon } from 'react-icons/md'

// internal imports
import defineBaseUIStyles from '../tools/defineBaseUIStyles'


// --- components ----------------------------------------------------

const LogoutButton = component<LogoutButtonProps>({
  displayName: 'LogoutButton',

  ...process.env.NODE_ENV === 'development' as any
    ? { validate: Spec.lazy(() => validateLogoutButtonProps) }
    : null,

  render: LogoutButtonView
})

// --- types ---------------------------------------------------------

type LogoutButtonProps = {
  onAction?: Function // TODO
}

// --- validation ----------------------------------------------------

const validateLogoutButtonProps = Spec.checkProps({
  optional: {
    onAction: Spec.func
  }
})

// --- styles --------------------------------------------------------

const useLogoutButtonStyles = defineBaseUIStyles(theme => {
  return {
    button: {
      width: '48px',
      height: '48px',
      border: 'none',
      color: theme.colors.foregroundInv,
      backgroundColor: theme.colors.primary300, 
      outline: 'none',
      cursor: 'pointer',

      ':hover': {
        backgroundColor: theme.colors.primary400,
      },

      ':active': {
        backgroundColor: theme.colors.primary300,
      }
    },

    icon: {
      width: '28px',
      height: '28px',
      marginTop: '2px'
    }
  }
})

// --- view ----------------------------------------------------------

function LogoutButtonView({
  onAction
}: LogoutButtonProps) {
  const classes = useLogoutButtonStyles()

  return (
    <StatefulTooltip showArrow content={() => 'Log out'} placement={PLACEMENT.bottom}>
      <button className={classes.button}>
        <LogoutIcon className={classes.icon}/>
      </button>
    </StatefulTooltip>
  )
}

// --- exports -------------------------------------------------------

export default LogoutButton
