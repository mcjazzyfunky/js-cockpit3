// external imports
import React from 'react'

// internal imports
import AdvancedFormCtrlCtx from '../context/AdvancedFormCtrlCtx' 

// derived imports
const { useContext } = React

// --- hoks -----------------------------------------------------------

function useAdvancedFormCtrl() {
  return useContext(AdvancedFormCtrlCtx)
}

// --- exports ---------------------------------------------------------

export default useAdvancedFormCtrl
