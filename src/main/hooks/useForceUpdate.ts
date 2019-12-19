// external imports
import React from 'react'

// derived imports
const { useState } = React

// --- hooks ---------------------------------------------------------

export default function useForceUpdate() {
  const [, setValue] = useState(false)

  return () => setValue(it => !it)
}
