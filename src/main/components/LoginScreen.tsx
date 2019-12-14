// external imports
import React, { ReactNode } from 'react'
import { component, isNode } from 'js-react-utils'
import { IoIosUnlock as LoginIcon } from 'react-icons/io'
import * as Spec from 'js-spec/validators'

import { PrimaryButton } from 'office-ui-fabric-react'

// internal import
import defineStyles from '../tools/defineStyles'
import createFormCtrl from '../control/createFormCtrl'
import FormCtrlCtx from '../context/FormCtrlCtx'
import TextInput from './TextInput'
import PasswordInput from './PasswordInput'
import CheckBox from './CheckBox'
import DefaultSizeCtx from '../context/DefaultSizeCtx'
import Size from '../enums/Size'

// derived imports
const { useCallback, useState } = React

// --- components ----------------------------------------------------

const LoginScreen = component<LoginScreenProps>({
  displayName: 'LoginScreen',
  
  ...process.env.NODE_ENV === 'development' as any
    ? { validate: Spec.lazy(() => validateLoginScreenProps) }
    : null,
 
  render: LoginScreenView
})

// --- types ---------------------------------------------------------

type LoginScreenProps = {
  slotHeader?: ReactNode,
  slotFooter?: ReactNode,
  slotLoginIntro?: ReactNode,
  slotLoginFields?: ReactNode
}

type LoginField = 
  { type: 'text', name: string, label: string }
    | { type: 'password', name: string, label: string }

type Classes = ReturnType<typeof useLoginScreenStyles>

// --- validation ----------------------------------------------------

const validateLoginScreenProps = Spec.checkProps({
  optional: {
    slotHeader: isNode,
    slotFooter: isNode,
    slotLoginIntro: isNode,
    slotLoginFields: isNode
  }
})

// --- styles --------------------------------------------------------

const useLoginScreenStyles = defineStyles(theme => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'absolute',
      minWidth: '100%',
      minHeight: '100%',
      backgroundColor: '#f3f3f2',
      ...theme.typography.font200
    },

    topSpacer: {
      flexGrow: 3
    },

    bottomSpacer: {
      flexGrow: 5 
    },

    header: {
      color: '#888'
    },

    body: {
      height: '500px',
      width: '560px',
      display: 'flex',
      margin: '16px',
      boxShadow: theme.lighting.shadow600
    },

    footer: {
      color: '#888'
    },
    
    column1: {
      flexGrow: 5,
      display: 'flex',
      flexDirection: 'column',
      minWidth: '280px',
      maxWidth: '280px',
      padding: '24px 20px',
      boxSizing: 'border-box',
      color: 'white',
      //backgroundColor: 'rgb(0, 195, 154)',
      backgroundColor: theme.colors.primary,
      borderRadius: '6px 0 0 6px',
      textAlign: 'center',

      backgroundImage: `url('data:image/svg+xml;charset=UTF-8,`
        + `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">`
        + '<g transform="translate(0 15)">'
        + `<circle fill="white" opacity="0.14" cx="0" cy="50" r="30"/>`
        + `<circle fill="white" opacity="0.14" cx="10" cy="80" r="50"/>`
        + `<circle fill="white" opacity="0.14" cx="10" cy="100" r="30"/>`
        + `<circle fill="white" opacity="0.17" cx="70" cy="100" r="65"/>`
        + `<circle fill="white" opacity="0.16" cx="120" cy="60" r="50"/>`
        + '</g>'
        + `</svg>')`,

      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'bottom',
    },

    column2: {
      display: 'flex',
      flexDirection: 'column',
      minWidth: '300px',
      maxWidth: '300px',
      padding: '24px 20px',
      flexGrow: 7,
      backgroundColor: 'white',
      borderRadius: '0 6px 6px 0'
    },

    column1Top: {
      flexGrow: 1
    },

    column1Bottom: {
    },

    headline: {
      ...theme.typography.font200,
      fontSize: '32px',
      fontWeight: 100,
      marginTop: '10px',
      height: '40px'
    },
    
    subheadline: {
      ...theme.typography.font200,
      fontSize: '17px',
      fontWeight: 100
    },

    column2Top: {
      flexGrow: 1
    },

    column2Bottom: {
    },

    loginButton: {
      width: '100%',
      //backgroundColor: 'rgb(0, 195, 154) !important',
      backgroundColor: theme.colors.primary,
      margin: '16px 0 0 0 !important'
    }
  }
})

// --- view ----------------------------------------------------------

function LoginScreenView({
  slotHeader,
  slotFooter,
  slotLoginIntro,
  slotLoginFields
}: LoginScreenProps) {
  const
    classes = useLoginScreenStyles(),
    [formCtrl] = useState(createFormCtrl),

    onSubmit = useCallback((ev: any) => { // TODO
      ev.preventDefault()

      formCtrl.submit()
    }, [])

  return (
    <div className={classes.root}>
      <DefaultSizeCtx.Provider value={Size.Compact}>
        <div className={classes.topSpacer}/>
        {renderHeader(slotHeader, classes)}
        <div className={classes.body}>
          <div className={classes.column1}>
            <div className={classes.column1Top}>
              {
                slotLoginIntro
                  ? slotLoginIntro
                  : renderDefaultLoginIntro(classes)
              }
            </div>
            <div className={classes.column1Bottom}>
              <LoginIcon size="70"/>
            </div>
          </div>

          <form className={classes.column2} onSubmit={onSubmit}>
            <FormCtrlCtx.Provider value={formCtrl}>
              <div className={classes.column2Top}>
                {
                  slotLoginFields
                    ? slotLoginFields
                    : renderDefaultLoginFields(classes)
                }
              </div>
              <div className={classes.column2Bottom}>
                {renderLoginActions(classes)}
              </div>
            </FormCtrlCtx.Provider>
          </form>
        </div>
        {renderFooter(slotFooter, classes)}
        <div className={classes.bottomSpacer}/>
      </DefaultSizeCtx.Provider>
    </div>
  )
}

function renderHeader(
  slotHeader: ReactNode,
  classes: Classes
) {
  if (!slotHeader) {
    return null
  }

  return (
    <div className={classes.header}>
      {slotHeader}
    </div>
  )
}

function renderFooter(
  slotFooter: ReactNode,
  classes: Classes
) {
  if (!slotFooter) {
    return null
  }

  return (
    <div className={classes.footer}>
      {slotFooter}
    </div>
  )
}

function renderDefaultLoginIntro(classes: Classes) {
  return (
    <>
      <div className={classes.headline}>Login</div>
      <div className={classes.subheadline}>Please enter your credentials to log in</div>
    </>
  )
}

function renderDefaultLoginFields(classes: Classes) {
  return (
    <>
      <TextInput
        name="username"
        label="Username"
        required
        messageOnError="Please enter a username"
      />

      <PasswordInput
        name="password"
        label="Password"
        required
        messageOnError="Please enter a password"
      />
    </>
  )
}

function renderLoginActions(classes: Classes) {
  return (
    <div className={classes.column2Bottom}>
      <CheckBox name="rememberLogin" label="Remember login"/>
      <PrimaryButton type="submit" className={classes.loginButton}>
        Log in
      </PrimaryButton>
    </div>
  )
}

// --- exports -------------------------------------------------------

export default LoginScreen 
