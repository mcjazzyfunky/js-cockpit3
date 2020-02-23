// external imports
import React, { FunctionComponent, FormEvent, ReactNode } from 'react'
import { component, isNode } from 'js-react-utils'
import * as Spec from 'js-spec/validators'

// internal imports
import FormCtrlCtx from '../context/FormCtrlCtx'
import FormCtrl from '../types/FormCtrl'

// derived imports
const { createElement: h, useState } = React

// --- hooks ---------------------------------------------------------

function useFormMgmt() {
  return useState(initFormMgmt)[0]
}

function initFormMgmt():
  [FormCtrl, FunctionComponent<FormProps>, (handler: SubmitHandler) => void] {
  
  let submitHandler: SubmitHandler = () => {} // TODO

  const
    formCtrl = createFormCtrl(data => submitHandler(data)),

    onSubmit = (ev: any) => { // TODO
      ev.preventDefault()
      formCtrl.submit()
    },

    setSubmitHandler = (handler: SubmitHandler) => {
      submitHandler = handler
    },

    Form = component<FormProps>({
      name: 'DynamicForm',

      ...process.env.NODE_ENV === 'development' as any
        ? { validate: validateFormCtrlProviderProps }
        : null,

      main({ className, onInput, children }) {
        return (
          h('form', { className, onInput, onSubmit },
            h(FormCtrlCtx.Provider, { value: formCtrl }, children)))
      }
    })

  return [formCtrl, Form, setSubmitHandler]
}

// --- types ---------------------------------------------------------

type FormProps = {
  className?: string,
  onInput?: (ev: FormEvent<HTMLFormElement>) => void,
  children?: ReactNode
}

type SubmitHandler =
  (data: Record<string, any>) => void

// --- validation ----------------------------------------------------

const validateFormCtrlProviderProps = Spec.checkProps({
  optional: {
    className: Spec.string,
    onInput: Spec.func,
    children: Spec.optional(isNode)
  }
})

// --- misc ----------------------------------------------------------

function createFormCtrl(submitHandler: SubmitHandler): FormCtrl {
  const
    subscriptions = new Set<any>(), // TODO
    performSubmit = () => {
      let invalid = false

      let data: any = {}

      subscriptions.forEach(requestValue => {
        const result = requestValue(true)

        if (!invalid) {
          if (!result.valid) {
            data = {}
            invalid = true
          } else if (result.name) {
            data[result.name] = result.value
          }
        }
      })

      if (!invalid) {
        submitHandler(data)
      }
    }

  return {
    registerComponent(requestValue) {
      subscriptions.add(requestValue)

      return () => subscriptions.delete(requestValue)
    },

    submit: performSubmit
  }
}


// --- exports -------------------------------------------------------

export default useFormMgmt
