import React, { ReactNode } from 'react'
import { component, isNode } from 'js-react-utils'
import { Select, SIZE } from 'baseui/select'
import { Label3 } from 'baseui/typography'
import * as Spec from 'js-spec/validators'

// internal import
import defineBaseUIStyles from '../tools/defineBaseUIStyles'

// --- constants -----------------------------------------------------

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100, 250, 500]

// --- components ----------------------------------------------------

const Paginator = component<PaginatorProps>({
  displayName: 'Paginator',
  
  ...process.env.NODE_ENV === 'development' as any
    ? { validate: Spec.lazy(() => validatePaginatorProps) }
    : null,
 
  render: PaginatorView
})

// --- types ---------------------------------------------------------

type PaginatorProps = {
  pageSize: number
  disabled: boolean
}

// --- validation ----------------------------------------------------

const validatePaginatorProps = Spec.checkProps({
  optional: {
  }
})

// --- styles --------------------------------------------------------

const usePaginatorStyles = defineBaseUIStyles(theme => {
  return {
    root: {
    },
    
    pageSizeSelector: {
      display: 'flex',
      flexFlow: 'row nowrap',
      alignItems: 'center',
      margin: '0 2rem'
    },

    pageSizeLabel: {
      padding: '0 0.8rem',
      whiteSpace: 'nowrap'
    },

  }
})

// --- view ----------------------------------------------------------

function PaginatorView({
  pageSize,
  disabled,
}: PaginatorProps) {
  const classes = usePaginatorStyles()

  return (
    <div className={classes.pageSizeSelector}>
      <div className={classes.pageSizeLabel}>
        <Label3>Items/page:</Label3>
      </div>
      <Select
        id="select-id"
        size={SIZE.compact}
        clearable={false}
        value={[{id: 10}]}
        searchable={false}

        options={
          PAGE_SIZE_OPTIONS.map(pageSize => ({
            id: pageSize
          }))
        }

        labelKey="id"
        valueKey="id"
      />
    </div>
  )
}

// --- exports -------------------------------------------------------

export default Paginator