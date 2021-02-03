// external imports
import React, { ReactNode } from 'react'
import { convertValidation, isNode } from 'js-react-utils'
import * as Spec from 'js-spec/validators'

// internal import
import defineStyles from '../tools/defineStyles'

// === types =========================================================

type TextProps = {
  size?: 'small' | 'medium' | 'large'
  children?: ReactNode
}

// === validation ====================================================

const validateTextProps = Spec.checkProps({
  optional: {
    size: Spec.oneOf('small', 'medium', 'large'),
    children: isNode
  }
})

// === styles ========================================================

const useTextStyles = defineStyles((theme) => {
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

// === components ====================================================

function Text({ size = 'medium', children }: TextProps) {
  const classes = useTextStyles()

  return <span className={classes[size]}>{children}</span>
}

Object.assign(Text, {
  displayName: 'Text',

  ...(process.env.NODE_ENV === ('development' as string) &&
    convertValidation(validateTextProps))
})

// === exports =======================================================

export default Text
