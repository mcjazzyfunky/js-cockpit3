// external imports
import React from 'react'

// internal imports
import FormCtx from '../context/FormCtrlCtx'

// derived imports
const { useContext } = React

// === hooks =========================================================

export default function useFormCtrl() {
  return useContext(FormCtx)
}
