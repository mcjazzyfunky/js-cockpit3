// external imports
import React, { FormEvent } from 'react'
import { component, isNode } from 'js-react-utils'
import * as Spec from 'js-spec/validators'

import { Stack, Checkbox } from 'office-ui-fabric-react'

// internal import
import defineStyles from '../tools/defineStyles'
import FieldWrapper from './FieldWrapper'
import useFormCtrl from '../hooks/useFormCtrl'

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

const useCheckBoxGroupStyles = defineStyles(theme => {
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
        <Stack tokens={{ childrenGap: 5 }}>
          {
            !options ? null : options.map(option => {
              return (
                <Checkbox
                  key={option.key}
                  label={option.text}
                />
              )
            })
          }
        </Stack>
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