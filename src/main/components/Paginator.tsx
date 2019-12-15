import React, { ReactNode } from 'react'
import { component, isNode } from 'js-react-utils'
import * as Spec from 'js-spec/validators'

import { Text, TextField } from 'office-ui-fabric-react'

// internal import
import defineStyles from '../tools/defineStyles'

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
  pageIndex: number,
  pageCount: number,
  disabled: boolean
}

// --- validation ----------------------------------------------------

const validatePaginatorProps = Spec.checkProps({
  optional: {
  }
})

// --- styles --------------------------------------------------------

const usePaginatorStyles = defineStyles(theme => {
  return {
    root: {
    },
    
    paginator: {
      display: 'flex',
      alignItems: 'center'
    },

    pageInputContainer: {
      display: 'flex',
      alignItems: 'center',
      margin: '0 10px',
//      ...theme.typography.font200,
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
      
      selectors: {
        ':hover': {
          backgroundColor: theme.palette.neutralLight
        },

        ':active': {
          backgroundColor: theme.palette.neutralQuaternaryAlt
        }
      }
    },

  }
})

// --- view ----------------------------------------------------------

function PaginatorView({
  pageIndex,
  pageCount,
  disabled = false,
}: PaginatorProps) {
  const classes = usePaginatorStyles()

  return (
    <div className={classes.paginator}>
      <a className={classes.pageButton}>
        <svg width="24px" height="24px" viewBox="0 0 64 64">
          <g>
            <polyline fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="bevel" strokeMiterlimit="10" points="32.936,48.936 
              15.936,31.936 32.936,14.936"/>
          </g>
          <g>
            <polyline fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="bevel" strokeMiterlimit="10" points="47.936,48.936 
              30.936,31.936 47.936,14.936"/>
          </g>
        </svg>
      </a>

      <a className={classes.pageButton}>
        <svg width="24px" height="24px" viewBox="0 0 64 64">
          <g>
            <polyline fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="bevel" strokeMiterlimit="10" points="37,15 20,32 
              37,49"/>
          </g>
        </svg>
      </a>
      
      <div className={classes.pageInputContainer}>
        <Text>Page</Text>
        <TextField
          className={classes.pageInput}
          value={"1"}
          disabled={disabled}
        />
        <Text>of 125</Text>
      </div>
      <a className={classes.pageButton}>
        <svg width="24px" height="24px" viewBox="0 0 64 64">
          <g>
            <polyline fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="bevel" strokeMiterlimit="10" points="27,15 44,32 
              27,49"/>
          </g>
        </svg>
      </a>
      <a className={classes.pageButton}>
        <svg width="24px" height="24px" viewBox="0 0 64 64">
          <g>
            <polyline fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="bevel" strokeMiterlimit="10" points="31,15 48,32 
              31,49"/>
          </g>
          <g>
            <polyline fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="bevel" strokeMiterlimit="10" points="16,15 33,32 
              16,49"/>
          </g>
        </svg>
      </a>
    </div>
  )
}

// --- exports -------------------------------------------------------

export default Paginator