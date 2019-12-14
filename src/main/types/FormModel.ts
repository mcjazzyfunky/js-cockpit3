// internal imports
import FormField from './FormField'

// --- types ---------------------------------------------------------

type FormModel = {
  fields: {
    [fieldName: string]: FormField
  }
}

// --- exports -------------------------------------------------------

export default FormModel
