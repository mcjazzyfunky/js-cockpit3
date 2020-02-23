// external imports
import React, { ReactNode } from 'react'
import { component, isNode } from 'js-react-utils'
import { FiLayers as DefaultLogo } from 'react-icons/fi'
import * as Spec from 'js-spec/validators'

// internal import
import defineStyles from '../tools/defineStyles'

// --- components ----------------------------------------------------

const Fieldset = component<FieldsetProps>({
  name: 'Fieldset',
  
  ...process.env.NODE_ENV === 'development' as any
    ? { validate: Spec.lazy(() => validateFieldsetProps) }
    : null,
 
  main: FieldsetView
})

// --- types ---------------------------------------------------------

type FieldsetProps = {
  title?: string,
  children?: ReactNode
}

// --- validation ----------------------------------------------------

const validateFieldsetProps = Spec.checkProps({
  optional: {
    title: Spec.string,
    children: isNode
  }
})

// --- styles --------------------------------------------------------

const useFieldsetStyles = defineStyles((theme, hasTitle: boolean) => {
  return {
    root: {
      display: 'inline-block',
      verticalAlign: 'top',
      marginRight: '2.5em'
    },

    title: {
      color: theme.palette.neutralPrimary,
      fontFamily: theme.fonts.medium.fontFamily,
      fontSize: '13px',
      fontWeight: 600,
      padding: '0 0 1em 0'
    },

    content: {
      display: 'table',
      marginLeft: hasTitle ? '1em' : ''
    }
  }
})

// --- view ----------------------------------------------------------

function FieldsetView({
  title,
  children
}: FieldsetProps) {
  const
    hasTitle = !!title,
    classes = useFieldsetStyles(hasTitle),

    titleContent = title
      ? <div className={`${classes.title}`}>
          {title}
        </div>
      : null

  return (
    <div data-component="jsc:Fieldset" className={`${classes.root}`}>
      {titleContent}
      <div className={classes.content}>
        {children}
      </div>
    </div>
  )
}

// --- exports -------------------------------------------------------

export default Fieldset