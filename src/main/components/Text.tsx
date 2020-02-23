// external imports
import React, { ReactNode } from 'react'
import { component, isNode } from 'js-react-utils'
import * as Spec from 'js-spec/validators'

// internal import
import defineStyles from '../tools/defineStyles'

// --- components ----------------------------------------------------

const Text = component<TextProps>({
  name: 'Text',
  
  ...process.env.NODE_ENV === 'development' as any
    ? { validate: Spec.lazy(() => validateTextProps) }
    : null,
 
  main: TextView
})

// --- types ---------------------------------------------------------

type TextProps = {
  size?: 'small' | 'medium' | 'large',
  children?: ReactNode
}

// --- validation ----------------------------------------------------

const validateTextProps = Spec.checkProps({
  optional: {
    size: Spec.oneOf('small', 'medium', 'large'),
    children: isNode
  }
})

// --- styles --------------------------------------------------------

const useTextStyles = defineStyles(theme => {
  return {
    small: {
//      ...theme.typography.font100
    },

    medium: {
//      ...theme.typography.font200
    },

    large: {
//      ...theme.typography.font400
    }
  }
})

// --- view ----------------------------------------------------------

function TextView({
  size = 'medium',
  children
}: TextProps) {
  const classes = useTextStyles()

  return (
    <span className={classes[size]}>
      {children}
    </span>
  )
}

// --- exports -------------------------------------------------------

export default Text 
