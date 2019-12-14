// external imports
import React from 'react'

// internal imports
import FormCtrl from '../types/FormCtrl'

// derived imports
const { createContext } = React

// --- context -------------------------------------------------------

export default createContext<FormCtrl | null>(null)
