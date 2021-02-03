import Localizer from '../types/i18n/Localizer'

// --- hooks ---------------------------------------------------------

function useLocalizer(): Localizer {
  return defaultLocalizer
}

// --- data ----------------------------------------------------------

const defaultLocalizer: Localizer = Object.freeze({
  getText(path, substitutions, defaultText) {
    let ret = defaultText

    if (substitutions) {
      Object.entries(substitutions).forEach(([key, value]) => {
        ret = ret.replace(key, String(value))
      })
    }

    return ret
  },

  formatNumber(value, format?) {
    // TODO: argument format
    return typeof value === 'number'
      ? value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      : ''
  }
})

// === exports =======================================================

export default useLocalizer
