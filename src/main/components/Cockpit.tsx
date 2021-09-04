// external imports
import React, { ReactNode } from 'react'
import { addComponentMeta, isNode } from 'js-react-utils'
import * as Spec from 'js-spec/validators'
import { Fabric, Customizer, ITheme } from '@fluentui/react'

// internal imports
import defineStyles from '../tools/defineStyles'
import useTheme from '../hooks/useTheme'

// === types =========================================================

type CockpitProps = {
  look?: 'default' | 'bright'
  theme?: ITheme
  slotBrand?: ReactNode
  slotTopNav?: ReactNode
  slotActions?: ReactNode
  slotMenu?: ReactNode
  slotSidebar?: ReactNode
  slotCenter?: ReactNode
}

type Classes = ReturnType<typeof useCockpitStyles>

// === validation ====================================================

const validateCockpitProps = Spec.checkProps({
  optional: {
    look: Spec.oneOf('default', 'bright'),
    theme: Spec.object,
    slotBrand: isNode,
    slotTopNav: isNode,
    slotActions: isNode,
    slotMenu: isNode,
    slotSidebar: isNode,
    slotCenter: isNode
  }
})

// === styles ========================================================

const useCockpitStyles = defineStyles(
  (_, theme: ITheme, look: 'default' | 'bright') => {
    // TODO
    return {
      root: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        padding: 0,
        margin: 0,
        overflow: 'hidden'
      },

      header: {
        display: 'flex',
        flexWrap: 'nowrap',
        alignItems: 'center',

        ...(look === 'default'
          ? {
              backgroundColor: '#484848',
              color: 'white'
            }
          : {
              backgroundColor: theme.palette.themeDark,
              color: theme.palette.white
            }),

        height: '46px'
      },

      brand: {
        display: 'flex',
        flexWrap: 'nowrap',
        marginRight: '40px',
        marginTop: '-4px' // TODO!!!
      },

      topNav: {
        display: 'flex',
        flexWrap: 'nowrap',
        flexGrow: 1
      },

      actions: {
        display: 'flex'
      },

      menu: {
        display: 'flex'
      },

      body: {
        display: 'flex',
        flexGrow: 1,
        height: '100%'
      },

      sidebar: {
        position: 'relative',
        //      backgroundColor: '#f8f8f8',
        width: '250px',
        overflow: 'auto'
      },

      center: {
        position: 'relative',
        flexGrow: 1,
        //      backgroundColor: 'white',
        margin: '3px', // TODO
        boxSizing: 'border-box'
      }
    }
  }
)

// === components ====================================================

function Cockpit({
  theme,
  look = 'default',
  slotBrand,
  slotTopNav,
  slotActions,
  slotMenu,
  slotSidebar,
  slotCenter
}: CockpitProps) {
  const defaultTheme = useTheme(),
    classes = useCockpitStyles(theme || defaultTheme, look)

  const header = renderHeader(slotBrand, slotTopNav, slotActions, classes),
    menu = renderMenu(slotMenu, classes),
    body = renderBody(slotSidebar, slotCenter, classes)

  const content = (
    <div className={classes.root}>
      {header}
      {menu}
      {body}
    </div>
  )

  return !theme ? (
    content
  ) : (
    <Customizer settings={{ theme }}>
      <Fabric>{content}</Fabric>
    </Customizer>
  )
}

addComponentMeta(Cockpit, {
  name: 'Cockpit',

  validation:
    process.env.NODE_ENV === ('development' as string) && validateCockpitProps
})

function renderHeader(
  slotBrand: ReactNode,
  slotTopNav: ReactNode,
  slotActions: ReactNode,
  classes: Classes
) {
  if (!slotBrand && !slotTopNav && !slotActions) {
    return null
  }

  const col1 = !slotBrand ? null : (
      <div className={classes.brand}>{slotBrand}</div>
    ),
    col2 = !slotTopNav ? null : (
      <div className={classes.topNav}>{slotTopNav}</div>
    ),
    col3 = !slotActions ? null : (
      <div className={classes.actions}>{slotActions}</div>
    )

  return (
    <div className={classes.header}>
      {col1}
      {col2}
      {col3}
    </div>
  )
}

function renderMenu(slotMenu: ReactNode, classes: Classes) {
  if (!slotMenu) {
    return null
  }

  return <div className={classes.menu}>{slotMenu}</div>
}

function renderBody(
  slotSidebar: ReactNode,
  slotCenter: ReactNode,
  classes: Classes
) {
  if (!slotSidebar && !slotCenter) {
    return null
  }

  const col1 = !slotSidebar ? null : (
      <div className={classes.sidebar}>{slotSidebar}</div>
    ),
    col2 = !slotCenter ? null : (
      <div className={classes.center}>{slotCenter}</div>
    )

  return (
    <div className={classes.body}>
      {col1}
      {col2}
    </div>
  )
}

// === exports =======================================================

export default Cockpit
