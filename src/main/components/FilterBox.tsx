// external imports
import React, { ReactNode } from 'react'
import { component, isNode } from 'js-react-utils'
import * as Spec from 'js-spec/validators'
import { GoSearch as SearchIcon } from 'react-icons/go'
import { MdFilterList as FilterIcon } from 'react-icons/md'

import { Button } from 'baseui/button'

// internal import
import defineBaseUIStyles from '../tools/defineBaseUIStyles'
import DefaultLabelPositionCtx from '../context/DefaultLabelPositionCtx'
import LabelPosition from '../enums/LabelPosition'

// --- components ----------------------------------------------------

const FilterBox = component<FilterBoxProps>({
  displayName: 'FilterBox',
  
  ...process.env.NODE_ENV === 'development' as any
    ? { validate: Spec.lazy(() => validateFilterBoxProps) }
    : null,
 
  render: FilterBoxView
})

// --- types ---------------------------------------------------------

type FilterBoxProps = {
  children: ReactNode
}

// --- validation ----------------------------------------------------

const validateFilterBoxProps = Spec.checkProps({
  optional: {
    children: isNode
  }
})

// --- styles --------------------------------------------------------

const useFilterBoxStyles = defineBaseUIStyles(theme => {
  return {
    root: {
      display: 'flex',

    },

    column1: {
      padding: '.5em 1.5em .25em 0'
    },

    column2: {
      display: 'flex'
    },

    column3: {
      padding: '0 0 .25em 5em'
    },

    filterIcon: {
      width: '24px',
      height: '24px',
      opacity: '0.3'
    }
  }
})

// --- view ----------------------------------------------------------

function FilterBoxView({
  children
}: FilterBoxProps) {
  const classes = useFilterBoxStyles()

  return (
    <div className={classes.root}>
      <div className={classes.column1}>
        <FilterIcon className={classes.filterIcon}/>
      </div>
      <div className={classes.column2}>
        <DefaultLabelPositionCtx.Provider value={LabelPosition.Beside}>
          {children}
        </DefaultLabelPositionCtx.Provider>
      </div>
      <div className={classes.column3}>
        <Button type="submit" size="compact" startEnhancer={() => <SearchIcon/>}>
          Search
        </Button>
      </div>
    </div>
  )
}

// --- exports -------------------------------------------------------

export default FilterBox
