// external imports
import React, { ReactNode } from 'react'
import { component, isNode } from 'js-react-utils'
import { FiLayers as DefaultLogo } from 'react-icons/fi'
import * as Spec from 'js-spec/validators'

// derived imports
const { useCallback } = React

// --- components ----------------------------------------------------

const Form = component<FormProps>({
  displayName: 'Form',
  
  ...process.env.NODE_ENV === 'development' as any
    ? { validate: Spec.lazy(() => validateFormProps) }
    : null,
 
  render: FormView
})

// --- types ---------------------------------------------------------

type FormProps = {
  onSubmit?: () => void,
  children?: ReactNode
}

// --- validation ----------------------------------------------------

const validateFormProps = Spec.checkProps({
  optional: {
    onSubmit: Spec.func,
    children: isNode
  }
})

// --- view ----------------------------------------------------------

function FormView({
  onSubmit,
  children
}: FormProps) {
  const onFormSubmit = useCallback(() => {
    if (onSubmit) {

      onSubmit()
    }
  }, [onSubmit])

  return (
    <form onSubmit={onFormSubmit}>
      {children}
    </form>
  )
}

// --- exports -------------------------------------------------------

export default Form
