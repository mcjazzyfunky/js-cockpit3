// external imports
import React from 'react'

// internal imports
import FormCtrl from '../types/ctrls/FormCtrl'

// derived imports
const { createContext } = React

// === contexts ======================================================

export default createContext<FormCtrl | null>(null)
