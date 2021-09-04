// external imports
import React, { ReactNode } from 'react'
import { addComponentMeta, isNode, withChildren } from 'js-react-utils'
import * as Spec from 'js-spec/validators'

// internal import
import defineStyles from '../tools/defineStyles'
import LabelPosition from '../enums/LabelPosition'
import useDefaultLabelPosition from '../hooks/useDefaultLabelPosition'

// derived imports
const { Children } = React

// === types =========================================================

type FieldWrapperProps = {
  label?: string
  required?: boolean
  error?: string
  children?: ReactNode
}

// === validation ====================================================

const validateFieldWrapperProps = Spec.checkProps({
  optional: {
    label: Spec.string,
    required: Spec.boolean,
    error: Spec.string,
    children: withChildren(Spec.singleOf(isNode))
  }
})

// === styles ========================================================

const useFieldWrapperStyles = defineStyles(
  (theme, required: boolean, labelAbove: boolean) => {
    return {
      root: {
        display: labelAbove ? 'flex' : 'table-row',
        flexDirection: labelAbove ? 'column' : 'row',
        alignItems: labelAbove ? 'stretch' : 'center'
      },

      label: {
        display: labelAbove ? 'block' : 'table-cell',
        //      ...theme.typography.font250,
        fontWeight: 500,
        textAlign: labelAbove ? 'inherit' : 'right',
        whiteSpace: labelAbove ? 'normal' : 'nowrap',
        padding: labelAbove ? '0 0 5px 0' : '5px 0.8em 0 0.9em',
        verticalAlign: labelAbove ? '' : 'top'
      },

      asterisk: {
        position: 'relative',
        display: 'inline-block',
        fontSize: '15px',
        marginLeft: '2px',
        bottom: '1px',
        color: theme.palette.redDark
      },

      field: {
        display: labelAbove ? 'block' : 'table-cell'
        //minWidth: '400px' // TODO
      },

      error: {
        padding: '3px 0'
        //      color: theme.colors.warning
      }
    }
  }
)

// === components ====================================================

function FieldWrapper({
  label,
  required = false,
  error,
  children
}: FieldWrapperProps) {
  const defaultLabelPosition = useDefaultLabelPosition(),
    classes = useFieldWrapperStyles(
      required,
      defaultLabelPosition === LabelPosition.Above
    ),
    maybeAsterisk =
      label && label.length > 0 && required ? (
        <div className={classes.asterisk}>*</div>
      ) : null

  return (
    <label data-component="jsc:FieldWrapper" className={classes.root}>
      <div className={classes.label}>
        {label}
        {maybeAsterisk}
      </div>
      <div className={classes.field}>
        {Children.only(children)}
        <div className={classes.error}>{error}</div>
      </div>
    </label>
  )
}

addComponentMeta(FieldWrapper, {
  name: 'FieldWrapper',

  validation:
    process.env.NODE_ENV === ('development' as string) &&
    validateFieldWrapperProps
})

// === exports =======================================================

export default FieldWrapper
