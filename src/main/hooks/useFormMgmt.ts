// external imports
import React, { ReactNode } from 'react'

// derived imports
const { createElement: h } = React

// internal imports
import AdvancedFormCtrlCtx from '../context/AdvancedFormCtrlCtx'
import FormModel from '../types/FormModel'
import AdvancedFormCtrl from '../types/AdvancedFormCtrl'

// -- exports --------------------------------------------------------

export default function useFormMgmt(formModel: FormModel) {
  const
    AdvancedFormCtrl: AdvancedFormCtrl = null as any // TODO,
  
  function AdvancedFormCtrlProvider({
    children 
  }: {
    children: ReactNode
  }) {
    return h(AdvancedFormCtrlCtx.Provider, { value: AdvancedFormCtrl }, children)
  }

  function setSubmitHandler() {
    // TODO
  }

  return [AdvancedFormCtrl, setSubmitHandler, AdvancedFormCtrlProvider]
}

// --- types ---------------------------------------------------------

type AdvancedFormCtrlParams = {
  initialData: Record<string, any>,
  handleChange(fieldName: string, value: any, dirty: boolean): void,
  handleSubmit(data: Record<string, any>): void,
  isFieldRequired(fieldName: string): void,
  isFieldDisabled(fieldName: string): void,
  getGeneralErrors(): string[]
}

// --- misc ----------------------------------------------------------

function createAdvancedFormCtrl({
  initialData = {},
  handleChange,
  handleSubmit,
  isFieldRequired,
  isFieldDisabled,
  getGeneralErrors
}: AdvancedFormCtrlParams): AdvancedFormCtrl {
  const
    data: Map<string, any> = new Map(),
    dirtyData: Map<string, any> = new Map(),
    dirtyFields: Set<string> = new Set()

  Object.entries(initialData).forEach(([key, value]) => {
    data.set(key, value)
    dirtyData.set(key, value)
  })

  const ret: AdvancedFormCtrl = {
    setFieldValue(fieldName, value, dirty = false) {
      if (!dirty) {
        data.set(fieldName, value)
        dirtyData.set(fieldName, value)
        dirtyFields.delete(fieldName)
      } else {
        dirtyData.set(fieldName, value)
        dirtyFields.add(fieldName)
      }

      handleChange(fieldName, value, dirty)
    },

    getFieldValue(fieldName, dirty: boolean = false) {
      return (dirty ? dirtyData : data).get(fieldName) 
    },
    
    isFieldDirty(fieldName: string) {
      return dirtyFields.has(fieldName)
    },

    isFieldRequired(fieldName: string) {
      return true // TODO
    },
    
    isFieldDisabled(fieldName: string) {
      return false
    },
    
    getFieldErrors(fieldName: string) {
     return []
    },

    getGeneralErrors() {
      return [] // TODO
    },

    getFormData(dirty: boolean = false) {
      const
        ret: Record<string, any> = {},
        dat = (dirty ? dirtyData : data)
    
      dat.forEach((value, key) => {
        ret[key] = value
      })

      return ret
    },

    submit() {
      dirtyFields.forEach(fieldName => {
        data.set(fieldName, dirtyData.get(fieldName))
      })

      dirtyFields.clear()

      handleSubmit(ret.getFormData(false))
    }
  }

  return ret
}