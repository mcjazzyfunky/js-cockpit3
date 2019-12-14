import React, { ReactNode } from 'react'
import { component, isNode } from 'js-react-utils'
import { LabelSmall } from 'baseui/typography'
import * as Spec from 'js-spec/validators'

// internal import
import defineStyles from '../tools/defineStyles'

// --- components ----------------------------------------------------

const PaginationInfo = component<PaginationInfoProps>({
  displayName: 'PaginationInfo',
  
  ...process.env.NODE_ENV === 'development' as any
    ? { validate: Spec.lazy(() => validatePaginationInfoProps) }
    : null,
 
  render: PaginationInfoView
})

// --- types ---------------------------------------------------------

type PaginationInfoProps = {
  about: 'items'
}

// --- validation ----------------------------------------------------

const validatePaginationInfoProps = Spec.checkProps({
  optional: {
  }
})

// --- styles --------------------------------------------------------

const usePaginationInfoStyles = defineStyles(theme => {
  return {
    root: {
      flexGrow: 1,
      textAlign: 'right',
      margin: '0 1rem',
      whiteSpace: 'nowrap'
    },
  }
})

// --- view ----------------------------------------------------------

function PaginationInfoView({
}: PaginationInfoProps) {
  const classes = usePaginationInfoStyles()

  return (
    <div className={classes.root}>
      <LabelSmall>Items 1-50 from 2.143</LabelSmall>
    </div>
  )
}

// --- exports -------------------------------------------------------

export default PaginationInfo
