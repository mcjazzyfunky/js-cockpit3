// external imports
import React, { FormEvent } from 'react'
import { convertValidation, isNode } from 'js-react-utils'
import { AiOutlineCalendar as CalendarIcon } from 'react-icons/ai'
import * as Spec from 'js-spec/validators'
import { Calendar, DatePicker } from '@fluentui/react'

// internal import
import defineStyles from '../tools/defineStyles'
import FieldWrapper from './FieldWrapper'
import useFormCtrl from '../hooks/useFormCtrl'

// derived import
const { useCallback, useEffect, useState, useRef } = React

// === types =========================================================

type DateInputProps = {
  name?: string
  label?: string
  required?: boolean
  disabled?: boolean
  messageOnError?: string
}

// === validation ====================================================

const validateDateInputProps = Spec.checkProps({
  optional: {
    name: Spec.string,
    label: Spec.string,
    disabled: Spec.boolean,
    required: Spec.boolean,
    messageOnError: Spec.string
  }
})

// === styles ========================================================

const useDateInputStyles = defineStyles((theme) => {
  return {
    root: {},
    xxx: {
      border: '1px solid red'
    }
  }
})

// === components ====================================================

function DateInput({
  name,
  label,
  disabled,
  required = false,
  messageOnError
}: DateInputProps) {
  const [value, setValue] = useState<Date | null>(null),
    [error, setError] = useState(''),
    classes = useDateInputStyles(),
    formCtrl = useFormCtrl(),
    nameRef = useRef(name),
    valueRef = useRef(value),
    requiredRef = useRef(required),
    messageOnErrorRef = useRef(messageOnError),
    onChange = useCallback(
      (ev: any) => {
        // TODO
        setValue(ev.date || null)

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
      <DatePicker
        disabled={disabled}
        formatDate={(date) => (!date ? '' : date.toISOString().substr(0, 10))}
        //error={!!error}
        onChange={onChange}
        textField={{
          iconProps: {
            iconName: 'jsc:calendar'
          }
        }}
        calendarAs={(props) => {
          const newProps = {
            ...props,

            navigationIcons: {
              closeIcon: 'jsc:close',
              leftNavigation: 'jsc:down',
              rightNavigation: 'jsc:up'
            }
          }

          return <Calendar {...newProps} />
        }}
      />
    </FieldWrapper>
  )
}

Object.assign(DateInput, {
  displayName: 'DateInput',

  ...(process.env.NODE_ENV === 'development' &&
    convertValidation(validateDateInputProps))
})

// === misc ==========================================================

function validate(
  value: Date | null,
  required: boolean,
  messageOnError?: string
) {
  let ret: string | null = null

  if (required && !value) {
    ret = messageOnError ? messageOnError : 'This is a required field'
  }

  return ret
}

// === exports =======================================================

export default DateInput
