import React, { ReactNode } from 'react'
import { component, isNode } from 'js-react-utils'
import * as Spec from 'js-spec/validators'

import { Icon, Text, TextField } from '@fluentui/react'

// internal import
import defineStyles from '../tools/defineStyles'

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
  pageIndex: number
  pageCount: number
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

    paginator: {
      display: 'flex',
      alignItems: 'center'
    },

    pageInputContainer: {
      display: 'flex',
      alignItems: 'center',
      margin: '0 10px',
      fontFamily: theme.fonts.medium.fontFamily,
      fontWeight: 600,
      whiteSpace: 'nowrap'
    },

    pageInput: {
      width: '4em',
      margin: '0 10px'
    },

    pageButton: {
      display: 'table-cell',
      width: '28px',
      height: '20px',
      padding: '10px 0',
      textAlign: 'center',
      background: 'none',
      outline: 'none',
      border: 'none',
      cursor: 'pointer',

      selectors: {
        ':hover': {
          backgroundColor: theme.palette.neutralLight
        },

        ':active': {
          backgroundColor: theme.palette.neutralQuaternary
        }
      }
    }
  }
})

// --- view ----------------------------------------------------------

function PaginatorView({
  pageIndex,
  pageCount,
  disabled = false
}: PaginatorProps) {
  const classes = usePaginatorStyles()

  return (
    <div className={classes.paginator}>
      <a className={classes.pageButton}>
        <Icon iconName="jsc:arrowDoubleLeft" />
      </a>
      <a className={classes.pageButton}>
        <Icon iconName="jsc:arrowLeft" />
      </a>
      <div className={classes.pageInputContainer}>
        <Text>Page</Text>
        <TextField
          className={classes.pageInput}
          value={'1'}
          disabled={disabled}
        />
        <Text>of 125</Text>
      </div>
      <a className={classes.pageButton}>
        <Icon iconName="jsc:arrowRight" />
      </a>
      <a className={classes.pageButton}>
        <Icon iconName="jsc:arrowDoubleRight" />
      </a>
    </div>
  )
}

// --- exports -------------------------------------------------------

export default Paginator
