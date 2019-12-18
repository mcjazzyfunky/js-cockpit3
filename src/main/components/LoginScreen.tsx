// external imports
import React, { ReactNode } from 'react'
import { component, isNode } from 'js-react-utils'
import { IoIosUnlock as LoginIcon } from 'react-icons/io'
import * as Spec from 'js-spec/validators'
import { Customizer, Fabric, PrimaryButton, Spinner, SpinnerSize, ITheme } from 'office-ui-fabric-react'

// internal import
import defineStyles from '../tools/defineStyles'
import useFormMgmt from '../hooks/useFormMgmt'
import TextInput from './TextInput'
import PasswordInput from './PasswordInput'
import CheckBox from './CheckBox'
import useTheme from '../hooks/useTheme'
import { constants } from 'crypto'

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
  slotLoginFields?: ReactNode,
  performLogin?: (data: Record<string, any>) => Promise<void>
  theme?: ITheme
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
    slotLoginFields: isNode,
    performLogin: Spec.func,
    theme: Spec.object
  }
})

// --- styles --------------------------------------------------------

const useLoginScreenStyles = defineStyles((_, theme: ITheme) => { // TODO
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'absolute',
      minWidth: '100%',
      minHeight: '100%',
      top: 0,
      left: 0,
      backgroundColor: '#f3f3f2',
    },

    topSpacer: {
      flexGrow: 3
    },

    bottomSpacer: {
      flexGrow: 5 
    },

    header: {
      fontFamily: theme.fonts.mediumPlus.fontFamily,
      fontSize: theme.fonts.mediumPlus.fontSize,
      color: theme.palette.neutralSecondaryAlt
    },

    body: {
      height: '450px',
      display: 'flex',
      margin: '16px',
      boxShadow: '5px 5px 25px silver'
    },

    footer: {
      fontFamily: theme.fonts.mediumPlus.fontFamily,
      fontSize: theme.fonts.mediumPlus.fontSize,
      color: theme.palette.neutralSecondaryAlt
    },
    
    column1: {
      flexGrow: 5,
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 20px',
      boxSizing: 'border-box',
      color: theme.palette.white,
      backgroundColor: theme.palette.themeSecondary,
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
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      minWidth: '250px',
      maxWidth: '250px',
      padding: '24px 20px',
      flexGrow: 7,
      backgroundColor: theme.palette.white,
      borderRadius: '0 6px 6px 0'
    },

    column1Top: {
      flexGrow: 1
    },

    column1Bottom: {
    },

    headline: {
      fontFamily: theme.fonts.large.fontFamily,
      fontSize: '30px',
      fontWeight: 200,
      marginTop: '10px',
      height: '40px'
    },
    
    subheadline: {
      fontFamily: theme.fonts.medium.fontFamily,
      fontSize: '16px',
      fontWeight: 100,
      marginTop: '6px'
    },

    column2Top: {
      flexGrow: 1
    },

    column2Bottom: {
    },

    loginButton: {
      width: '100%',
      margin: '16px 0 0 0 !important',
      zIndex: 32000
    },

    defaultIntro: {
      width: '220px',
      maxWidth: '220px'
    },

    loadingPane: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      backgroundColor: theme.palette.white,
      opacity: '0.6',
      zIndex: 30000
    },

    spinner: {
      marginLeft: '1em'
    },

    errorMsg: {
      backgroundColor: theme.semanticColors.errorBackground,
      color: theme.palette.redDark,
      fontFamily: theme.fonts.medium.fontFamily,
      fontSize: theme.fonts.medium.fontSize,
      borderRadius: '2px',
      padding: '.6em .9em',
      margin: '1.5em 0'
    }
  }
})

// --- view ----------------------------------------------------------

function LoginScreenView({
  slotHeader,
  slotFooter,
  slotLoginIntro,
  slotLoginFields,
  performLogin,
  theme
}: LoginScreenProps) {
  const
    [isLoading, setLoading] = useState(false),
    [errorMsg, setErrorMsg] = useState(''),
    defaultTheme = useTheme(),
    classes = useLoginScreenStyles(theme || defaultTheme),
    [_, LoginForm, setSubmitHandler] = useFormMgmt(),

    onFormInput = useCallback(() => {
      if (errorMsg) {
        setErrorMsg('')
      }
    }, [errorMsg])

  setSubmitHandler(data => {
    if (performLogin && !isLoading) {
      const result = performLogin(data)
        
      if (result && typeof result.then === 'function') {
        setErrorMsg('')
        setLoading(true)

        result
          .then(() => {

          })
          .catch(error => {
            let msg = !error
              ? ''
              : typeof error === 'string'
                ? error.trim()
                : String(error.message || error).trim()

            if (!msg) {
              msg = 'Could not log in'
            }
            
            setErrorMsg(msg)
          })
          .finally(() => {
            setLoading(false)
          })
      }
    }
  })

  const content = (
    <div className={classes.root}>
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

        <LoginForm className={classes.column2} onInput={onFormInput}>
          { !isLoading ? null : <div className={classes.loadingPane}/>}
          <div className={classes.column2Top}>
            {
              slotLoginFields
                ? slotLoginFields
                : renderDefaultLoginFields(classes)
            }
          </div>
          <div className={classes.column2Bottom}>
            { errorMsg ? <div className={classes.errorMsg}>{errorMsg}</div> : null }
            <CheckBox name="rememberLogin" label="remember login"/>
            {renderLoginButton(isLoading, classes)}
          </div>
        </LoginForm>
      </div>
      {renderFooter(slotFooter, classes)}
      <div className={classes.bottomSpacer}/>
    </div>
  )

  return !theme
    ? content
    : <Customizer settings={{ theme }}>
        <Fabric>
           {content}
        </Fabric>
      </Customizer>
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
    <div className={classes.defaultIntro}>
      <div className={classes.headline}>Login</div>
      <div className={classes.subheadline}>Please enter your personal credentials to log in</div>
    </div>
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

function renderLoginButton(isLoading: boolean, classes: Classes) {
  const
    loginButtonText = isLoading
      ? 'Logging in... '
      : 'Log in',

    spinner = isLoading
      ? <Spinner size={SpinnerSize.small} className={classes.spinner}/>
      : null

  return (
    <PrimaryButton type="submit" className={classes.loginButton}>
      {loginButtonText}
      {spinner}
    </PrimaryButton>
  )
}

// --- exports -------------------------------------------------------

export default LoginScreen 
