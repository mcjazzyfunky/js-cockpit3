// external imports
import React, { FunctionComponent, ReactNode } from 'react'
import { component, isNode } from 'js-react-utils'
import * as Spec from 'js-spec/validators'

// internal imports
import createFormCtrl from '../control/createFormCtrl'
import FormCtrlCtx from '../context/FormCtrlCtx'
import FormCtrl from '../types/FormCtrl'

// derived imports
const { createElement: h, useState } = React

// --- hooks ---------------------------------------------------------

function useFormMgmt() {
  return useState(initFormMgmt)[0]
}

function initFormMgmt(): [FormCtrl, FunctionComponent<FormCtrlProviderProps>] {
  const
    formCtrl = createFormCtrl(),

    FormCtrlProvider = component<FormCtrlProviderProps>({
      displayName: 'FormCtrlProvider', 

      render({ children }) {
        return h(FormCtrlCtx.Provider, { value: formCtrl }, children)
      }
    })

  return [formCtrl, FormCtrlProvider]
}

// --- types ---------------------------------------------------------

type FormCtrlProviderProps = {
  children?: ReactNode
}

// --- validation ----------------------------------------------------

const validateFormCtrlProviderProps = Spec.exact({
  children: Spec.optional(isNode)
})

// --- exports -------------------------------------------------------

export default useFormMgmt
