// --- types ---------------------------------------------------------

type AdvancedFormCtrl = {
  setFieldValue(fieldName: string, value: any, dirty: boolean): void,
  getFieldValue(fieldName: string): any,
  isFieldDirty(fieldName: string): boolean,
  isFieldRequired(fieldName: string): boolean,
  isFieldDisabled(fieldName: string): boolean,
  getFieldErrors(fieldName: string): string[],
  getGeneralErrors(): string[],
  getFormData(dirty: boolean): Record<string, any>,
  submit(): void
}

// --- exports -------------------------------------------------------

export default AdvancedFormCtrl
