import { createContext } from 'react'
import { addComponentMeta } from 'js-react-utils'
import * as Spec from 'js-spec/validators'

// internal imports
import LabelPosition from '../enums/LabelPosition'

// === validation ====================================================

const validateDefaultLabelPositionCtxProviderProps = Spec.checkProps({
  required: {
    value: Spec.oneOf(LabelPosition.Above, LabelPosition.Beside)
  }
})

// === contexts ======================================================

const DefaultLabelPositionCtx = createContext(LabelPosition.Above)

addComponentMeta(DefaultLabelPositionCtx.Provider, {
  name: 'DefaultLabelPositionCtx.Provider',

  validation:
    process.env.NODE_ENV === ('development' as string) &&
    validateDefaultLabelPositionCtxProviderProps
})

// === exports =======================================================-

export default DefaultLabelPositionCtx
