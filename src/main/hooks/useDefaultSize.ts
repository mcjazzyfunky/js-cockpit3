// external imports
import React from 'react'

// internal imports
import DefaultSizeCtx from '../context/DefaultSizeCtx'

// derived imports
const { useContext } = React

// --- hooks ---------------------------------------------------------

export default function useDefaultSize() {
  return useContext(DefaultSizeCtx)
}
