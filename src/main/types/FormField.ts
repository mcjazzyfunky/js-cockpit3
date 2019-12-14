// --- types ---------------------------------------------------------

type FieldModel = {
  required?: boolean | [true, string],

  validations?: Array<
    { predicate: (value: any) => boolean, errorMsg: string }
  >
}

// --- exports -------------------------------------------------------

export default FieldModel
