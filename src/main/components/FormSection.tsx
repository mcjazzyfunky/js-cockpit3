// external imports
import React, { ReactNode } from 'react'
import { convertValidation, isNode } from 'js-react-utils'
import { FiLayers as DefaultLogo } from 'react-icons/fi'
import * as Spec from 'js-spec/validators'

// internal import
import defineStyles from '../tools/defineStyles'

// --- types ---------------------------------------------------------

type FormSectionProps = {
  title?: string
  children?: ReactNode
}

// --- validation ----------------------------------------------------

const validateFormSectionProps = Spec.checkProps({
  optional: {
    title: Spec.string,
    children: isNode
  }
})

// --- styles --------------------------------------------------------

const useFormSectionStyles = defineStyles((theme, hasTitle: boolean) => {
  return {
    root: {},

    title: {
      fontFamily: theme.fonts.small.fontFamily,
      fontSize: theme.fonts.small.fontSize,
      fontWeight: 600,
      color: theme.palette.neutralPrimary,
      textTransform: 'uppercase',
      paddingLeft: '0.8em'
    },

    content: {
      padding: '1em 1em',
      borderWidth: '.5px 0 0 0',
      borderStyle: 'solid',
      borderColor: theme.palette.neutralQuaternaryAlt
    }
  }
})

// --- components ----------------------------------------------------

function FormSection({ title, children }: FormSectionProps) {
  const hasTitle = !!title,
    classes = useFormSectionStyles(hasTitle),
    titleContent = title ? (
      <div className={`${classes.title}`}>{title}</div>
    ) : null

  return (
    <div data-component="jsc:FormSection" className={`${classes.root}`}>
      {titleContent}
      <div className={classes.content}>{children}</div>
    </div>
  )
}

Object.assign(FormSection, {
  displayName: 'FormSection',

  ...(process.env.NODE_ENV === ('development' as string) &&
    convertValidation(validateFormSectionProps))
})

// --- exports -------------------------------------------------------

export default FormSection
