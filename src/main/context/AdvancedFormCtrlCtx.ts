// externals imports
import React from 'react'

// internal imports
import AdvancedFormCtrl from '../types/AdvancedFormCtrl'

// derived imports
const { createContext } = React

// --- exports -------------------------------------------------------

export default createContext<AdvancedFormCtrl | null>(null)
