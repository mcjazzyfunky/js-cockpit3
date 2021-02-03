// === types =========================================================

type I18n = {
  getText(
    path: string,
    replacements: Record<string, string | number> | null,
    defaultText: string
  ): string

  formatNumber(value: number, decimals?: number): string
}

// === exports =======================================================

export default I18n
