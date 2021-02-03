// external imports
import React, { ReactNode } from 'react'
import { convertValidation, isNode } from 'js-react-utils'
import * as Spec from 'js-spec/validators'

// internal import
import defineStyles from '../tools/defineStyles'
import LabelPosition from '../enums/LabelPosition'
import DefaultLabelPositionCtx from '../context/DefaultLabelPositionCtx'

// === types =========================================================

type DataFormProps = {
  title?: string
  slotActions?: ReactNode
  children?: ReactNode
}

// === validation ====================================================

const validateDataFormProps = Spec.checkProps({
  optional: {
    title: Spec.string,
    slotActions: isNode,
    children: isNode
  }
})

// === styles ========================================================

const useDataFormStyles = defineStyles((theme) => {
  return {
    root: {
      padding: '5px',
      backgroundColor: '#fefefe',

      selectors: {
        '[data-component="jsc:Tabs"]': {
          selectors: {
            '.ms-Pivot': {
              backgroundColor: theme.palette.neutralLighter,
              marginBottom: '1em',
              height: '34px'
            },

            '.ms-Pivot *': {
              height: '34px'
            },

            '.ms-Button:hover': {
              //backgroundColor: theme.palette.neutralQuaternaryAlt,
            },

            '.ms-Pivot-text': {
              marginTop: '-6px'
            }
          }
        }
      }
    },

    header: {
      display: 'flex',
      alignItems: 'center',
      borderWidth: '0 0 0.5px 0',
      borderStyle: 'solid',
      borderColor: theme.palette.neutralQuaternary
    },

    title: {
      padding: '6px 16px 6px 16px',
      fontFamily: theme.fonts.large.fontFamily,
      fontSize: theme.fonts.large.fontSize,
      fontWeight: 400,
      marginRight: '1em'
    },

    actions: {},

    body: {
      padding: '5px 0px'
    }
  }
})

// === components ====================================================

function DataForm({ title, slotActions, children }: DataFormProps) {
  const classes = useDataFormStyles()

  return (
    <div className={classes.root}>
      <DefaultLabelPositionCtx.Provider value={LabelPosition.Beside}>
        <div className={classes.header}>
          <div className={classes.title}>{title}</div>
          {slotActions ? (
            <div className={classes.actions}>{slotActions}</div>
          ) : null}
        </div>
        <div className={classes.body}>{children}</div>
      </DefaultLabelPositionCtx.Provider>
    </div>
  )
}

Object.assign(DataForm, {
  displayName: 'DataForm',

  ...(process.env.NODE_ENV === ('development' as string) &&
    convertValidation(validateDataFormProps))
})

// === exports =======================================================

export default DataForm
