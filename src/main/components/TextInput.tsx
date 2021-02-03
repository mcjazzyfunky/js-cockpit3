// external imports
import React, { FormEvent } from 'react'
import { convertValidation, isNode } from 'js-react-utils'
import * as Spec from 'js-spec/validators'
import { TextField } from '@fluentui/react'

// internal import
import defineStyles from '../tools/defineStyles'
import FieldWrapper from './FieldWrapper'
import useFormCtrl from '../hooks/useFormCtrl'

// derived import
const { useCallback, useEffect, useState, useRef } = React

// === types =========================================================

type TextInputProps = {
  name?: string
  label?: string
  required?: boolean
  disabled?: boolean
  pattern?: RegExp
  messageOnError?: string
}

// === validation ====================================================

const validateTextInputProps = Spec.checkProps({
  optional: {
    name: Spec.string,
    label: Spec.string,
    disabled: Spec.boolean,
    required: Spec.boolean,
    pattern: Spec.instanceOf(RegExp),
    messageOnError: Spec.string
  }
})

// === styles ========================================================

const useTextInputStyles = defineStyles((theme) => {
  return {
    root: {}
  }
})

// === components ====================================================

function TextInput({
  name,
  label,
  disabled,
  required = false,
  pattern,
  messageOnError
}: TextInputProps) {
  const [value, setValue] = useState(''),
    [error, setError] = useState(''),
    classes = useTextInputStyles(),
    formCtrl = useFormCtrl(),
    nameRef = useRef(name),
    valueRef = useRef(value),
    requiredRef = useRef(required),
    patternRef = useRef(pattern),
    messageOnErrorRef = useRef(messageOnError),
    onInput = useCallback(
      (ev: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue((ev.target as any).value)

        if (error) {
          setError('')
        }
      },
      [error]
    )

  useEffect(() => {
    nameRef.current = name
    valueRef.current = value
    requiredRef.current = required
    ;(patternRef.current = pattern),
      (messageOnErrorRef.current = messageOnError)
  }, [name, value, required, pattern, messageOnError])

  useEffect(() => {}, [value])

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
      <TextField disabled={disabled} errorMessage={error} onChange={onInput} />
    </FieldWrapper>
  )
}

Object.assign(TextInput, {
  displayName: 'TextInput',

  ...(process.env.NODE_ENV === 'development' &&
    convertValidation(validateTextInputProps))
})

// === misc ==========================================================

function validate(
  value: string,
  required: boolean,
  pattern?: RegExp,
  messageOnError?: string
) {
  let ret: string | null = null

  if (required && !value) {
    ret = messageOnError ? messageOnError : 'This is a required field'
  } else if (value && pattern && !pattern.test(value)) {
    ret = messageOnError ? messageOnError : 'Please enter a valid value'
  }

  return ret
}

// === exports =======================================================

export default TextInput
