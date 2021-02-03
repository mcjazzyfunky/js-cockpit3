// external imports
import React, { FormEvent } from 'react'
import { convertValidation, isNode } from 'js-react-utils'
import * as Spec from 'js-spec/validators'
import { Dropdown } from 'office-ui-fabric-react'

// internal import
import defineStyles from '../tools/defineStyles'
import FieldWrapper from './FieldWrapper'
import useFormCtrl from '../hooks/useFormCtrl'

// derived import
const { useCallback, useEffect, useState, useRef } = React

// === types =========================================================

type SelectBoxProps = {
  name?: string
  label?: string
  required?: boolean
  disabled?: boolean
  messageOnError?: string

  options?: Array<{
    value: string
    text: string
  }>
}

// === validation ====================================================

const validateSelectBoxProps = Spec.checkProps({
  optional: {
    name: Spec.string,
    label: Spec.string,
    disabled: Spec.boolean,
    required: Spec.boolean,
    messageOnError: Spec.string
  }
})

// === styles ========================================================

const useSelectBoxStyles = defineStyles((theme) => {
  return {
    root: {}
  }
})

// === components ====================================================

function SelectBox({
  name,
  label,
  disabled,
  required = false,
  messageOnError,
  options
}: SelectBoxProps) {
  const [value, setValue] = useState<string | null>(null),
    [error, setError] = useState(''),
    classes = useSelectBoxStyles(),
    formCtrl = useFormCtrl(),
    nameRef = useRef(name),
    valueRef = useRef(value),
    requiredRef = useRef(required),
    messageOnErrorRef = useRef(messageOnError),
    onInput = useCallback(
      (ev: FormEvent<HTMLInputElement>) => {
        setValue(ev.currentTarget.value)

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
    messageOnErrorRef.current = messageOnError
  }, [name, value, required, messageOnError])

  useEffect(() => {}, [value])

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
    <FieldWrapper label={label} required={required} error={error}>
      <Dropdown
        disabled={disabled}
        //error={!!error}
        //value={value ? [{ key: value }]: []}
        //onChange={(ev: any) => setValue(ev.value[0] && ev.value[0].key)}
        options={
          !options
            ? []
            : options.map((option) => ({
                key: option.value,
                text: option.text
              }))
        }
      />
    </FieldWrapper>
  )
}

Object.assign(SelectBox, {
  displayName: 'SelectBox',

  ...(process.env.NODE_ENV === ('development' as string) &&
    convertValidation(validateSelectBoxProps))
})

// === misc ==========================================================

function validate(
  value: null | string,
  required: boolean,
  messageOnError?: string
) {
  let ret: string | null = null

  if (required && !value) {
    ret = messageOnError ? messageOnError : 'This is a required field' // TODO
  }

  return ret
}

// === exports =======================================================

export default SelectBox
