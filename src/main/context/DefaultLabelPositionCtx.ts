import { context } from 'js-react-utils'
import * as Spec from 'js-spec/validators'

// internal imports
import LabelPosition from '../enums/LabelPosition'

// --- context -------------------------------------------------------

export default context<LabelPosition>({
  name: 'DefaultLabelPositionCtx',
  default: LabelPosition.Above,
  
  ...process.env.NODE_ENV === 'development'
    ? { validate: Spec.oneOf(LabelPosition.Above, LabelPosition.Beside) }
    : null
})
