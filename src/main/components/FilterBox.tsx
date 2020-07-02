// external imports
import React, { ReactNode } from 'react'
import { component, isNode } from 'js-react-utils'
import * as Spec from 'js-spec/validators'
import { GoSearch as SearchIcon } from 'react-icons/go'
import { MdFilterList as FilterIcon } from 'react-icons/md'

import { PrimaryButton } from '@fluentui/react'

// internal import
import defineStyles from '../tools/defineStyles'
import DefaultLabelPositionCtx from '../context/DefaultLabelPositionCtx'
import LabelPosition from '../enums/LabelPosition'

// --- components ----------------------------------------------------

const FilterBox = component<FilterBoxProps>({
  name: 'FilterBox',

  ...(process.env.NODE_ENV === ('development' as any)
    ? { validate: Spec.lazy(() => validateFilterBoxProps) }
    : null),

  main: FilterBoxView
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

const useFilterBoxStyles = defineStyles(theme => {
  return {
    root: {
      display: 'flex'
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
      opacity: '0.3',
      color: theme.palette.black
    }
  }
})

// --- view ----------------------------------------------------------

function FilterBoxView({ children }: FilterBoxProps) {
  const classes = useFilterBoxStyles()

  return (
    <div className={classes.root}>
      <div className={classes.column1}>
        <FilterIcon className={classes.filterIcon} />
      </div>
      <div className={classes.column2}>
        <DefaultLabelPositionCtx.Provider value={LabelPosition.Beside}>
          {children}
        </DefaultLabelPositionCtx.Provider>
      </div>
      <div className={classes.column3}>
        <PrimaryButton type="submit" onRenderIcon={() => <SearchIcon />}>
          Search
        </PrimaryButton>
      </div>
    </div>
  )
}

// --- exports -------------------------------------------------------

export default FilterBox
