// external imports
import React, { FormEvent } from 'react'
import { component, isNode } from 'js-react-utils'
import { Input } from 'baseui/input'
import * as Spec from 'js-spec/validators'

import { Checkbox } from 'baseui/checkbox'

// internal import
import defineBaseUIStyles from '../tools/defineBaseUIStyles'
import FieldWrapper from './FieldWrapper'
import useFormCtrl from '../hooks/useFormCtrl'
import useDefaultSize from '../hooks/useDefaultSize'

// derived import
const { useCallback, useEffect, useState, useRef } = React

// --- components ----------------------------------------------------

const CheckBoxGroup = component<CheckBoxGroupProps>({
  displayName: 'CheckBoxGroup',
  
  ...process.env.NODE_ENV === 'development' as any
    ? { validate: Spec.lazy(() => validateCheckBoxGroupProps) }
    : null,
 
  render: CheckBoxGroupView
})

// --- types ---------------------------------------------------------

type CheckBoxGroupProps = {
  name?: string,
  label?: string,
  value?: string,
  options?: Option[],
  required?: boolean,
  disabled?: boolean,
  messageOnError?: string
}

type Option = {
  key: string,
  text: string
}

// --- validation ----------------------------------------------------

const validateCheckBoxGroupProps = Spec.checkProps({
  optional: {
    name: Spec.string,
    label: Spec.string,
    value: Spec.string,
    options: Spec.arrayOf(Spec.lazy(() => validateOption)),
    disabled: Spec.boolean,
    required: Spec.boolean,
    messageOnError: Spec.string
  }
})

const validateOption = Spec.exact({
  key: Spec.string,
  text: Spec.string
})

// --- styles --------------------------------------------------------

const useCheckBoxGroupStyles = defineBaseUIStyles(theme => {
  return {
    root: {
      paddingTop: '3px'
    },
  }
})

// --- view ----------------------------------------------------------

function CheckBoxGroupView({
  name,
  label,
  value,
  options,
  disabled,
  required = false,
  messageOnError
}: CheckBoxGroupProps) {
  const
    [val, setVal] = useState(''),
    [error, setError] = useState(''),
    defaultSize = useDefaultSize(),
    classes = useCheckBoxGroupStyles(),
    formCtrl = useFormCtrl(),
    nameRef = useRef(name),
    valueRef = useRef(val),
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
    valueRef.current = val
    requiredRef.current = required
    messageOnErrorRef.current = messageOnError
  }, [name, val, required,  messageOnError])
  
  useEffect(() => {
  }, [val])

  useEffect(() => {
    if (formCtrl) {
      return formCtrl.registerComponent((update: boolean) => {
        const errorMsg = validate(
          valueRef.current,
          requiredRef.current
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
    <FieldWrapper label={label} required={required} error={error}>
      <div className={classes.root}>
      {
        !options ? null : options.map(option => {
          return (
            <Checkbox>
              {option.text}
            </Checkbox>
          )
        })
      }
      </div>
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
  }

  return ret
}

// --- exports -------------------------------------------------------

export default CheckBoxGroup 