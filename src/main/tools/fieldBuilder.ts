import FormField from '../types/FormField'

export default function fieldlBuilder() {
  const formField: FormField = {
  } 

  return {
    required(errorMsg: string) {
      formField.required = [true, errorMsg]

      return fieldModelBuilder2(formField)
    },

    validate(predicate: (value: any) => boolean, errorMsg: string) {
      return fieldModelBuilder2(formField)
        .validate(predicate, errorMsg)
    },

    build() {
      return formField
    }
  }
}

function fieldModelBuilder2(formField: FormField) {
  const ret = {
    validate(predicate: (value: any) => boolean, errorMsg: string) {
      if (formField.validations) {
        formField.validations = [{ predicate, errorMsg}]
      } else {
        formField.validations!.push({ predicate, errorMsg })
      }

      return ret
    },

    build() {
      return formField
    }
  }

  return ret
}
