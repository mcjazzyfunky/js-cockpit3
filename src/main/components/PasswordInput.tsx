// external imports
import React, { FormEvent } from 'react'
import { component, isNode } from 'js-react-utils'
import * as Spec from 'js-spec/validators'

import { TextField } from 'office-ui-fabric-react'

// internal import
import defineStyles from '../tools/defineStyles'
import FieldWrapper from './FieldWrapper'
import useFormCtrl from '../hooks/useFormCtrl'

// derived imports
const { useCallback, useEffect, useRef, useState } = React

// --- components ----------------------------------------------------

const PasswordInput = component<PasswordInputProps>({
  name: 'PasswordInput',
  
  ...process.env.NODE_ENV === 'development' as any
    ? { validate: Spec.lazy(() => validatePasswordInputProps) }
    : null,
 
  main: PasswordInputView
})

// --- types ---------------------------------------------------------

type PasswordInputProps = {
  name?: string,
  label?: string,
  disabled?: boolean,
  required?: boolean,
  size?: 'compact' | 'default' | 'large'
  pattern?: RegExp,
  messageOnError?: string
}

// --- validation ----------------------------------------------------

const validatePasswordInputProps = Spec.checkProps({
  optional: {
    name: Spec.string,
    label: Spec.string,
    disabled: Spec.boolean,
    required: Spec.boolean,
    size: Spec.oneOf('compact', 'default', 'large'),
    pattern: Spec.instanceOf(RegExp),
    messageOnError: Spec.string
  }
})

// --- styles --------------------------------------------------------

const usePasswordInputStyles = defineStyles(theme => {
  return {
    root: {
    },
  }
})

// --- view ----------------------------------------------------------

function PasswordInputView({
  name,
  label,
  disabled,
  required = false,
  size,
  pattern,
  messageOnError
}: PasswordInputProps) {
  const
    [value, setValue] = useState(''),
    [error, setError] = useState(''),
    classes = usePasswordInputStyles(),
    formCtrl = useFormCtrl(),
    nameRef = useRef(name),
    valueRef = useRef(value),
    requiredRef = useRef(required),
    patternRef = useRef(pattern),
    messageOnErrorRef = useRef(messageOnError),

    onInput = useCallback((ev: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValue((ev.target as any).value)

      if (error) {
        setError('')
      }
    }, [error])

  useEffect(() => {
    nameRef.current = name
    valueRef.current = value
    requiredRef.current = required
    patternRef.current = pattern,
    messageOnErrorRef.current = messageOnError
  }, [name, value, required, pattern, messageOnError])
  
  useEffect(() => {
  }, [value])

  useEffect(() => {
    if (formCtrl) {
      return formCtrl.registerComponent((update: boolean) => {
        const errorMsg = validate(
          valueRef.current,
          requiredRef.current,
          patternRef.current,
          messageOnErrorRef.current
        )

        if (update && errorMsg) {
          setError(errorMsg)
        }

        return !errorMsg
          ? {
              name: nameRef.current || '',
              valid: true,
              value: valueRef.current
            }
          : {
              name: nameRef.current || '',
              valid: false
            }
      })
    }
  }, [formCtrl])

  return (
    <FieldWrapper label={label} required={required}>
      <TextField
        type="password"
        disabled={disabled}
        name={name}
        errorMessage={error}
        onChange={onInput}
      />
    </FieldWrapper>
  )
}

// --- misc ----------------------------------------------------------

function validate(value: string, required: boolean, pattern?: RegExp, messageOnError?: string) {
  let ret: string | null = null

  if (required && !value) {
    ret = messageOnError
      ? messageOnError
      : 'This is a required field'
  } else if (value && pattern && !pattern.test(value)) {
    ret = messageOnError
      ? messageOnError
      : 'Please enter a valid value'
  }

  return ret
}


// --- exports -------------------------------------------------------

export default PasswordInput 