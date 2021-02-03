// === types =========================================================

type Localizer = {
  getText(
    name: string,
    substitutions: Record<string, string | number> | null,
    defaultText: string
  ): string

  formatNumber(value: number, format?: NumberFormat): string
}

type NumberFormat = {}

/* // TODO
  | number // fraction digits
  | {
      minIntDigits?: number
      maxIntDigits?: number
      minFracDigits?: number
      maxFracDigits?: number
    }
  */

// === exports =======================================================

export default Localizer
