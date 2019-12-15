// external imports
import React, { ReactNode } from 'react'
import { component, isNode } from 'js-react-utils'
import * as Spec from 'js-spec/validators'

// internal import
import defineStyles from '../tools/defineStyles'
import LabelPosition from '../enums/LabelPosition'
import DefaultLabelPositionCtx from '../context/DefaultLabelPositionCtx'

// --- components ----------------------------------------------------

const DataForm = component<DataFormProps>({
  displayName: 'DataForm',
  
  ...process.env.NODE_ENV === 'development' as any
    ? { validate: Spec.lazy(() => validateDataFormProps) }
    : null,
 
  render: DataFormView
})

// --- types ---------------------------------------------------------

type DataFormProps = {
  title?: string,
  children?: ReactNode
}

// --- validation ----------------------------------------------------

const validateDataFormProps = Spec.checkProps({
  optional: {
    title: Spec.string,
    children: isNode
  }
})

// --- styles --------------------------------------------------------

const useDataFormStyles = defineStyles(theme => {
  return {
    root: {
      margin: '5px'
    },

    header: {
      borderWidth: '0 0 0.5px 0',
      borderStyle: 'solid',
      borderColor: theme.palette.neutralQuaternary
    },

    title: {
      padding: '6px 16px 6px 16px',
      fontFamily: theme.fonts.large.fontFamily,
      fontSize: theme.fonts.large.fontSize,
      fontWeight: 400,
    },

    body: {
      padding: '5px 0px',
    }
  }
})

// --- view ----------------------------------------------------------

function DataFormView({
  title,
  children
}: DataFormProps) {
  const classes = useDataFormStyles()

  return (
    <div className={classes.root}>
      <DefaultLabelPositionCtx.Provider value={LabelPosition.Beside}>
        <div className={classes.header}>
          <div className={classes.title}>
              {title}
          </div>
        </div>
        <div className={classes.body}>
          {children}
        </div>
      </DefaultLabelPositionCtx.Provider>
    </div>
  )
}

// --- exports -------------------------------------------------------

export default DataForm