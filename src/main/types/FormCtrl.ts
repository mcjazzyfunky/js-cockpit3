import AdvancedFormCtrlCtx from "../context/AdvancedFormCtrlCtx"

// --- types ---------------------------------------------------------

type FormCtrl = {
  registerComponent(requestValue: (update: boolean) => Response): () => void,
  submit(): void
}

type Response = {
  name: string,
  valid: true,
  value: any
} | { 
  name: string,
  valid: false
}

// --- exports -------------------------------------------------------

export default FormCtrl

