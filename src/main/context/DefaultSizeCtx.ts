// external imports
import { context } from 'js-react-utils'
import * as Spec from 'js-spec/validators'

// internal imports
import Size from '../enums/Size'

// --- context -------------------------------------------------------

export default context<Size>({
  displayName: 'DefaultSizeCtx',
  defaultValue: Size.Default,
  
  ...process.env.NODE_ENV === 'development'
    ? { validate: Spec.oneOf(Size.Compact, Size.Default, Size.Large) }
    : null
})
