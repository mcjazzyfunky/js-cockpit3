// external imports
import React, { ReactNode } from 'react'
import { component, isNode } from 'js-react-utils'
import { FiLayers as DefaultLogo } from 'react-icons/fi'
import * as Spec from 'js-spec/validators'

// internal import
import defineStyles from '../tools/defineStyles'

// --- components ----------------------------------------------------

const Brand = component<BrandProps>({
  displayName: 'Brand',
  
  ...process.env.NODE_ENV === 'development' as any
    ? { validate: Spec.lazy(() => validateBrandProps) }
    : null,
 
  render: BrandView
})

// --- types ---------------------------------------------------------

type BrandProps = {
  vendor?: string,
  title?: string,
  logo?: ReactNode,
  size?: 'small' | 'medium' | 'large' | 'huge',
  multicolor?: boolean
}

// --- validation ----------------------------------------------------

const validateBrandProps = Spec.checkProps({
  optional: {
    vendor: Spec.string,
    title: Spec.string,
    logo: isNode,
    size: Spec.oneOf('small', 'medium', 'large', 'huge'),
    multicolor: Spec.boolean
  }
})

// --- styles --------------------------------------------------------

const useBrandStyles = defineStyles(theme => {
  return {
    root: {
      display: 'flex',
      whiteSpace: 'nowrap',
      alignItems: 'center',
//      fontSize: '18px',
      //color: theme.colors.backgroundInv
    },

    column1: {
      padding: '0 12px 0 0'
    },
    
    column2: {
      display: 'flex',
      flexDirection: 'column'
    },

    logo: {
    },

    defaultLogo: {
      width: '1.6em',
      height: '1.6em',
      padding: '0.75em 0 0 0' // TODO
    },

    logoMulticolor: {
//      color: theme.colors.primary300
    },

    vendor: {
//      ...theme.typography.font200,
//      fontSize: '90%',
    },
  
    title: {
//      ...theme.typography.font200,
//      fontSize: '125%'
    },

    scaleMedium: {
    },

    scaleSmall: {
      transform: 'scale(.8, .8)'
    },

    scaleLarge: {
      transform: 'scale(1.1, 1.1)'
    },

    scaleHuge: {
      transform: 'scale(1.2, 1.2)'
    }
  }
})

// --- view ----------------------------------------------------------

function BrandView({
  vendor,
  title,
  logo,
  size,
  multicolor = false
}: BrandProps) {
  const classes = useBrandStyles()

  const brandLogo = logo
    ? logo
    : <DefaultLogo className={classes.defaultLogo}/>

  const column1 =
    <div className={classes.column1}>
      <div className={multicolor ? classes.logoMulticolor : classes.logo}>
        {brandLogo}
      </div>
    </div>

  const column2 =
    <div className={classes.column2}>
      {vendor ? <div className={classes.vendor}>{vendor}</div> : null }
      {title ? <div className={classes.title}>{title}</div> : null}
    </div>

  const sizeClass = size === 'small'
    ? classes.scaleSmall
    : size === 'large'
    ? classes.scaleLarge
    : size === 'huge'
    ? classes.scaleHuge
    : classes.scaleMedium

  return (
    <div className={`${classes.root} ${sizeClass}`}>
      {column1}
      {column2}
    </div>
  )
}

// --- exports -------------------------------------------------------

export default Brand
