// external imports
import React, { FormEvent } from 'react'
import { component, isNode } from 'js-react-utils'
import { Input } from 'baseui/input'
import * as Spec from 'js-spec/validators'

import { Radio, RadioGroup } from 'baseui/radio'

// internal import
import defineBaseUIStyles from '../tools/defineBaseUIStyles'
import FieldWrapper from './FieldWrapper'
import useFormCtrl from '../hooks/useFormCtrl'
import useDefaultSize from '../hooks/useDefaultSize'

// derived import
const { useCallback, useEffect, useState, useRef } = React

// --- components ----------------------------------------------------

const RadioButtonGroup = component<RadioButtonGroupProps>({
  displayName: 'RadioButtonGroup',
  
  ...process.env.NODE_ENV === 'development' as any
    ? { validate: Spec.lazy(() => validateRadioButtonGroupProps) }
    : null,
 
  render: RadioButtonGroupView
})

// --- types ---------------------------------------------------------

type RadioButtonGroupProps = {
  name?: string,
  label?: string,
  value?: string,
  options?: Option[],
  align?: 'horizontal' | 'vertical',
  required?: boolean,
  disabled?: boolean,
  messageOnError?: string
}

type Option = {
  value: string,
  text: string
}

// --- validation ----------------------------------------------------

const validateRadioButtonGroupProps = Spec.checkProps({
  optional: {
    name: Spec.string,
    label: Spec.string,
    value: Spec.string,
    options: Spec.lazy(() => Spec.arrayOf(validateOption)),
    align: Spec.oneOf('horizontal', 'vertical'),
    disabled: Spec.boolean,
    required: Spec.boolean,
    messageOnError: Spec.string
  }
})

const validateOption = Spec.exact({
  value: Spec.string,
  text: Spec.string
})

// --- styles --------------------------------------------------------

const useRadioButtonGroupStyles = defineBaseUIStyles(theme => {
  return {
    root: {
    },
  }
})

// --- view ----------------------------------------------------------

function RadioButtonGroupView({
  name,
  label,
  options,
  value,
  align = 'vertical',
  disabled = false,
  required = false,
  messageOnError
}: RadioButtonGroupProps) {
  const
    [val, setVal] = useState(value),
    [error, setError] = useState(''),
    defaultSize = useDefaultSize(),
    classes = useRadioButtonGroupStyles(),
    formCtrl = useFormCtrl(),
    nameRef = useRef(name),
    valRef = useRef(val),
    requiredRef = useRef(required),
    messageOnErrorRef = useRef(messageOnError),

    onInput = useCallback((ev: FormEvent<HTMLInputElement>) => {
      setVal(ev.currentTarget.value)

      if (error) {
        setError('')
      }
    }, [error])

  useEffect(() => {
    nameRef.current = name
    valRef.current = val
    requiredRef.current = required
    messageOnErrorRef.current = messageOnError
  }, [name, val, required,  messageOnError])
  
  useEffect(() => {
  }, [val])

  useEffect(() => {
    if (formCtrl) {
      return formCtrl.registerComponent((update: boolean) => {
        const errorMsg = validate(
          valRef.current,
          requiredRef.current
        )

        if (update && errorMsg) {
          setError(errorMsg)
        }

        return !errorMsg
          ? {
              name: nameRef.current || '',
              valid: true,
              value: valRef.current
            }
          : {
              name: nameRef.current || '',
              valid: false
            }
      })
    }
  }, [formCtrl])

  return (
    <FieldWrapper label={label} required={required} error={error}>
      <RadioGroup
        align={align}
        value={value}
      >
        {
          !options ? null : options.map(option => {
            return (
              <Radio value={option.value} name={name}>
                {option.text}
              </Radio>
            )
          })
        }
      </RadioGroup>
    </FieldWrapper> 
  )
}

// --- misc ----------------------------------------------------------

function validate(value: string | undefined, required: boolean, pattern?: RegExp, messageOnError?: string) {
  let ret: string | null = null

  if (required && !value) {
    ret = messageOnError
      ? messageOnError
      : 'This is a required field'
  }

  return ret
}

// --- exports -------------------------------------------------------

export default RadioButtonGroup 