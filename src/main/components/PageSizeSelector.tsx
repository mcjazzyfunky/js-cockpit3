import React, { ReactNode } from 'react'
import { component, isNode } from 'js-react-utils'
import * as Spec from 'js-spec/validators'

import { Dropdown, Icon, Text } from '@fluentui/react'

// internal import
import defineStyles from '../tools/defineStyles'

// --- constants -----------------------------------------------------

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100, 250, 500]

// --- components ----------------------------------------------------

const Paginator = component<PaginatorProps>({
  name: 'Paginator',

  ...(process.env.NODE_ENV === ('development' as any)
    ? { validate: Spec.lazy(() => validatePaginatorProps) }
    : null),

  main: PaginatorView
})

// --- types ---------------------------------------------------------

type PaginatorProps = {
  pageSize: number
  disabled: boolean
}

// --- validation ----------------------------------------------------

const validatePaginatorProps = Spec.checkProps({
  optional: {}
})

// --- styles --------------------------------------------------------

const usePaginatorStyles = defineStyles(theme => {
  return {
    root: {},

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

    dropdown: {
      minWidth: '55px'
    }
  }
})

// --- view ----------------------------------------------------------

function PaginatorView({ pageSize, disabled }: PaginatorProps) {
  const classes = usePaginatorStyles()

  return (
    <div className={classes.pageSizeSelector}>
      <div className={classes.pageSizeLabel}>
        <Text>Items/page:</Text>
      </div>
      <Dropdown
        selectedKey="50"
        className={classes.dropdown}
        onRenderCaretDown={renderChevronDownIcon}
        options={PAGE_SIZE_OPTIONS.map(pageSize => ({
          key: String(pageSize),
          text: String(pageSize)
        }))}
      />
    </div>
  )
}

function renderChevronDownIcon() {
  return <Icon iconName="jsc:chevronDown" />
}

// --- exports -------------------------------------------------------

export default Paginator
