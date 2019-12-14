export function hasOwnProp(obj: any, propName: string)  {
  return obj !== undefined && obj !== null
    && Object.prototype.hasOwnProperty.call(obj, propName)
}
