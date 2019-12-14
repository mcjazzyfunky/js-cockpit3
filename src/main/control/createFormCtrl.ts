
// internal imports
import createNotifier from '../tools/createNotifier'
import FormCtrl from '../types/FormCtrl'

export default function createFormCtrl(): FormCtrl {
  const
    subscriptions = new Set<any>(), // TODO
    
    performSubmit = () => {
      let invalid = false

      let data: any = {}

      subscriptions.forEach(requestValue => {
        const result = requestValue(true)

        if (!invalid) {
          if (!result.valid) {
            data = {}
            invalid = true
          } else if (result.name) {
            data[result.name] = result.value
          }
        }
      })

      if (invalid) {
        console.log('Form data not valid')
      } else {
        console.log('Submitted data:', data)
      }
    }

  return {
    registerComponent(requestValue) {
      subscriptions.add(requestValue)

      return () => subscriptions.delete(requestValue)
    },

    submit: performSubmit
  }
}
