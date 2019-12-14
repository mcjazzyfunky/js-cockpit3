// external imports
import React from 'react'

// internal imports
import FormCtx from '../context/FormCtrlCtx'

// derived imports
const { useContext } = React

// --- hoooks --------------------------------------------------------

export default function useFormCtrl() {
  return useContext(FormCtx)
}
