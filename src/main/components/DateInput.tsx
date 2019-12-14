// external imports
import React, { FormEvent } from 'react'
import { component, isNode } from 'js-react-utils'
import { Datepicker } from 'baseui/datepicker'
import { AiOutlineCalendar as CalendarIcon } from 'react-icons/ai'
import * as Spec from 'js-spec/validators'

// internal import
import defineBaseUIStyles from '../tools/defineBaseUIStyles'
import FieldWrapper from './FieldWrapper'
import useFormCtrl from '../hooks/useFormCtrl'
import useDefaultSize from '../hooks/useDefaultSize'

// derived import
const { useCallback, useEffect, useState, useRef } = React

// --- components ----------------------------------------------------

const DateInput = component<DateInputProps>({
  displayName: 'DateInput',
  
  ...process.env.NODE_ENV === 'development' as any
    ? { validate: Spec.lazy(() => validateDateInputProps) }
    : null,
 
  render: DateInputView
})

// --- types ---------------------------------------------------------

type DateInputProps = {
  name?: string,
  label?: string,
  required?: boolean,
  disabled?: boolean,
  size?: 'compact' | 'default' | 'large',
  messageOnError?: string
}

// --- validation ----------------------------------------------------

const validateDateInputProps = Spec.checkProps({
  optional: {
    name: Spec.string,
    label: Spec.string,
    disabled: Spec.boolean,
    required: Spec.boolean,
    size: Spec.oneOf('compact', 'default', 'large'),
    messageOnError: Spec.string
  }
})

// --- styles --------------------------------------------------------

const useDateInputStyles = defineBaseUIStyles(theme => {
  return {
    root: {
    },

    dateInputWrapper: {
      paddingRight: '34px',
    },

    container: {
      position: 'relative'
    },

    calendarIcon: {
      position: 'absolute',
      width: '20px',
      height: '20px',
      right: '10px',
      top: '6px',
      cursor: 'pointer'
    }
  }
})

// --- view ----------------------------------------------------------

function DateInputView({
  name,
  label,
  disabled,
  required = false,
  size,
  messageOnError
}: DateInputProps) {
  const
    [value, setValue] = useState<Date | null>(null),
    [error, setError] = useState(''),
    defaultSize = useDefaultSize(),
    classes = useDateInputStyles(),
    formCtrl = useFormCtrl(),
    nameRef = useRef(name),
    valueRef = useRef(value),
    requiredRef = useRef(required),
    messageOnErrorRef = useRef(messageOnError),

    onChange = useCallback((ev: any) => { // TODO
      setValue(ev.date || null)

      if (error) {
        setError('')
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

  const overrides: any = { // TODO
    InputWrapper: {
      props: {
        className: classes.dateInputWrapper
      }
    }
  }

  return (
    <FieldWrapper label={label} required={required} error={error}>
      <div className={classes.container}>
        <Datepicker
          disabled={disabled}
          error={!!error}
          size={size || defaultSize}
          onChange={onChange}
          overrides={overrides}
        />
        <CalendarIcon className={classes.calendarIcon}/>
      </div>
    </FieldWrapper> 
  )
}

// --- misc ----------------------------------------------------------

function validate(value: Date | null, required: boolean, messageOnError?: string) {
  let ret: string | null = null

  if (required && !value) {
    ret = messageOnError
      ? messageOnError
      : 'This is a required field'
  }

  return ret
}

// --- exports -------------------------------------------------------

export default DateInput 