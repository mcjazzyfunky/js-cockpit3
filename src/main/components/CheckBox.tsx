// external imports
import React, { FormEvent } from 'react'
import { component, isNode } from 'js-react-utils'
import * as Spec from 'js-spec/validators'

import { Checkbox } from 'office-ui-fabric-react'

// internal import
import defineStyles from '../tools/defineStyles'
import useFormCtrl from '../hooks/useFormCtrl'

// derived import
const { useCallback, useEffect, useState, useRef } = React

// --- components ----------------------------------------------------

const CheckBox = component<CheckBoxProps>({
  displayName: 'CheckBox',
  
  ...process.env.NODE_ENV === 'development' as any
    ? { validate: Spec.lazy(() => validateCheckBoxProps) }
    : null,
 
  render: CheckBoxView
})

// --- types ---------------------------------------------------------

type CheckBoxProps = {
  name?: string,
  label?: string,
  required?: boolean,
  disabled?: boolean,
  size?: 'compact' | 'default' | 'large',
  messageOnError?: string
}

// --- validation ----------------------------------------------------

const validateCheckBoxProps = Spec.checkProps({
  optional: {
    name: Spec.string,
    label: Spec.string,
    disabled: Spec.boolean,
    required: Spec.boolean,
    messageOnError: Spec.string
  }
})

// --- styles --------------------------------------------------------

const useCheckBoxStyles = defineStyles(theme => {
  return {
    root: {
    },
  }
})

// --- view ----------------------------------------------------------

function CheckBoxView({
  name,
  label,
  disabled,
  required = false,
  messageOnError
}: CheckBoxProps) {
  const
    [value, setValue] = useState(false),
    [error, setError] = useState(''),
    classes = useCheckBoxStyles(),
    formCtrl = useFormCtrl(),
    nameRef = useRef(name),
    valueRef = useRef(value),
    requiredRef = useRef(required),
    messageOnErrorRef = useRef(messageOnError),

    onInput = useCallback((
      ev: FormEvent<HTMLElement | HTMLInputElement> | undefined,
      checked: boolean | undefined
    ) => {
      if (ev && checked !== undefined) {
        setValue(checked)

        if (error) {
          setError('')
        }
      }
    }, [error])

  useEffect(() => {
    nameRef.current = name
    valueRef.current = value
    requiredRef.current = required
    messageOnErrorRef.current = messageOnError
  }, [name, value, required, messageOnError])
  
  useEffect(() => {
  }, [value])

  useEffect(() => {
    if (formCtrl) {
      return formCtrl.registerComponent((update: boolean) => {
        const errorMsg = validate(
          valueRef.current,
          requiredRef.current,
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
      <Checkbox
        checked={value}
        disabled={disabled}
        name={name}
        label={label}
        onChange={onInput}>
      </Checkbox>
  )
}

// --- misc ----------------------------------------------------------

function validate(value: boolean, required: boolean, messageOnError?: string) {
  let ret: string | null = null

  if (required && !value) {
    ret = messageOnError
      ? messageOnError
      : 'This is a required field' // TODO
  }

  return ret
}

// --- exports -------------------------------------------------------

export default CheckBox
