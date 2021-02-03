import React, { ReactNode } from 'react'
import { convertValidation, isNode } from 'js-react-utils'
import * as Spec from 'js-spec/validators'
import { Dropdown, Icon, Text } from '@fluentui/react'

// internal import
import defineStyles from '../tools/defineStyles'

// === constants =====================================================

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100, 250, 500]

// === types =========================================================

type PageSizeSelectorProps = {
  pageSize: number
  disabled: boolean
}

// === validation ====================================================

const validatePageSizeSelectorProps = Spec.checkProps({
  optional: {}
})

// === styles ========================================================

const usePaginatorStyles = defineStyles((theme) => {
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

// === components ====================================================

function PageSizeSelector({ pageSize, disabled }: PageSizeSelectorProps) {
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
        options={PAGE_SIZE_OPTIONS.map((pageSize) => ({
          key: String(pageSize),
          text: String(pageSize)
        }))}
      />
    </div>
  )
}

Object.assign(PageSizeSelector, {
  displayName: PageSizeSelector,

  ...(process.env.NODE_ENV === ('development' as string) &&
    convertValidation(validatePageSizeSelectorProps))
})

function renderChevronDownIcon() {
  return <Icon iconName="jsc:chevronDown" />
}

// === exports =======================================================

export default PageSizeSelector
