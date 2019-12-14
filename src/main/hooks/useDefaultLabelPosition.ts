// external imports
import React from 'react'

// internal imports
import DefaultLabelPositionCtx from '../context/DefaultLabelPositionCtx'

// derived imports
const { useContext } = React

// --- hooks ---------------------------------------------------------

export default function useDefaultSize() {
  return useContext(DefaultLabelPositionCtx)
}
