// external imports
import React, { ReactNode } from 'react'
import { component, isNode } from 'js-react-utils'
import * as Spec from 'js-spec/validators'

// internal import
import defineStyles from '../tools/defineStyles'
import DefaultSizeCtx from '../context/DefaultSizeCtx'
import Size from '../enums/Size'

// --- components ----------------------------------------------------

const Cockpit = component<CockpitProps>({
  displayName: 'Cockpit',
  
  ...process.env.NODE_ENV === 'development' as any
    ? { validate: Spec.lazy(() => validateCockpitProps) }
    : null,
 
  render: CockpitView
})

// --- types ---------------------------------------------------------

type CockpitProps = {
  slotBrand?: ReactNode,
  slotTopNav?: ReactNode,
  slotActions?: ReactNode,
  slotMenu?: ReactNode,
  slotSidebar?: ReactNode,
  slotCenter?: ReactNode
}

type Classes = ReturnType<typeof useCockpitStyles>

// --- validation ----------------------------------------------------

const validateCockpitProps = Spec.checkProps({
  optional: {
    slotBrand: isNode,
    slotTopNav: isNode,
    slotActions: isNode,
    slotMenu: isNode,
    slotSidebar: isNode,
    slotCenter: isNode,
  }
})

// --- styles --------------------------------------------------------

const useCockpitStyles = defineStyles(theme => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'nowrap',
      position: 'absolute',
      width: '100%',
      height: '100%',
      padding: 0,
      margin: 0,
      overflow: 'hidden'
    },

    header: {
      display: 'flex',
      flexWrap: 'nowrap',
      alignItems: 'center',
      backgroundColor: '#484848',
      color: theme.colors.white,
      minHeight: '48px'
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
      backgroundColor: '#f8f8f8',
      width: '250px',
      overflow: 'auto'
    },

    center: {
      position: 'relative',
      flexGrow: 1,
      backgroundColor: 'white',
      margin: '3px', // TODO
      boxSizing: 'border-box'
    }
  }
})

// --- view ----------------------------------------------------------

function CockpitView({
  slotBrand,
  slotTopNav,
  slotActions,
  slotMenu,
  slotSidebar,
  slotCenter
}: CockpitProps) {
  const classes = useCockpitStyles()

  const
    header = renderHeader(slotBrand, slotTopNav, slotActions, classes),
    menu = renderMenu(slotMenu, classes),
    body = renderBody(slotSidebar, slotCenter, classes)

  return (
    <div className={classes.root}>
      {header}
      {menu}
      {body}
    </div>
  )
}

function renderHeader(
  slotBrand: ReactNode,
  slotTopNav: ReactNode,
  slotActions: ReactNode,
  classes: Classes
) {
  if (!slotBrand && !slotTopNav && !slotActions) {
    return null
  }

  const
    col1 = !slotBrand
      ? null
      : <div className={classes.brand}>{slotBrand}</div>,
    
    col2 = !slotTopNav
      ? null
      : <div className={classes.topNav}>{slotTopNav}</div>,
    
    col3 = !slotActions
      ? null
      : <div className={classes.actions}>{slotActions}</div>

  return (
    <DefaultSizeCtx.Provider value={Size.Compact}>
      <div className={classes.header}>
        {col1}{col2}{col3}
      </div>
    </DefaultSizeCtx.Provider>
  )
}

function renderMenu(slotMenu: ReactNode, classes: Classes) {
  if (!slotMenu) {
    return null
  }

  return (
    <div className={classes.menu}>
      {slotMenu}
    </div>
  )
}

function renderBody(slotSidebar: ReactNode, slotCenter: ReactNode, classes: Classes) {
  if (!slotSidebar && !slotCenter) {
    return null
  }
  
  const
    col1 = !slotSidebar
      ? null
      : <div className={classes.sidebar}>{slotSidebar}</div>,
    
    col2 = !slotCenter
      ? null
      : <div className={classes.center}>{slotCenter}</div>

  return (
    <div className={classes.body}>
      <DefaultSizeCtx.Provider value={Size.Compact}>
        {col1}
        {col2}
      </DefaultSizeCtx.Provider>
    </div>
  )
}

// --- exports -------------------------------------------------------

export default Cockpit

