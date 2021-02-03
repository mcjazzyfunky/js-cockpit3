import React, { ReactNode } from 'react'
import { convertValidation, isNode } from 'js-react-utils'
import * as Spec from 'js-spec/validators'

import { Text } from '@fluentui/react'

// internal import
import defineStyles from '../tools/defineStyles'

// === types =========================================================

type PaginationInfoProps = {
  about: 'items'
}

// === validation ====================================================

const validatePaginationInfoProps = Spec.checkProps({
  optional: {}
})

// === styles ========================================================

const usePaginationInfoStyles = defineStyles((theme) => {
  return {
    root: {
      flexGrow: 1,
      textAlign: 'right',
      margin: '0 1rem',
      whiteSpace: 'nowrap'
    }
  }
})

// === components ====================================================

function PaginationInfo({}: PaginationInfoProps) {
  const classes = usePaginationInfoStyles()

  return (
    <div className={classes.root}>
      <Text>Items 1-50 from 2.143</Text>
    </div>
  )
}

Object.assign(PaginationInfo, {
  displayName: 'PaginationInfo',

  ...(process.env.NODE_ENV === 'development' &&
    convertValidation(validatePaginationInfoProps))
})

// === exports =======================================================

export default PaginationInfo
