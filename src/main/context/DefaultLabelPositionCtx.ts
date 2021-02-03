import { createContext } from 'react'
import { convertValidation } from 'js-react-utils'
import * as Spec from 'js-spec/validators'

// internal imports
import LabelPosition from '../enums/LabelPosition'

// --- validation ----------------------------------------------------

const validateDefaultLabelPositionCtxProviderProps = Spec.checkProps({
  required: {
    value: Spec.oneOf(LabelPosition.Above, LabelPosition.Beside)
  }
})

// --- contexts ------------------------------------------------------

const DefaultLabelPositionCtx = createContext(LabelPosition.Above)

Object.assign(DefaultLabelPositionCtx.Provider, {
  displayName: 'DefaultLabelPositionCtx.Provider',

  ...(process.env.NODE_ENV === 'development' &&
    convertValidation(validateDefaultLabelPositionCtxProviderProps))
})

// --- exports --------------------------------------------------------

export default DefaultLabelPositionCtx
