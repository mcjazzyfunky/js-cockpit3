import I18n from '../types/I18n'

// --- hooks ---------------------------------------------------------

function useI18n(): I18n {
  return defaultI18n
}

// --- data ----------------------------------------------------------

const defaultI18n: I18n = Object.freeze({
  getText(path, replacements, defaultText) {
    let ret = defaultText

    if (replacements) {
      Object.entries(replacements).forEach(([key, value]) => {
        ret = ret.replace(key, String(value))
      })
    }

    return ret
  },
  
  formatNumber(value, decimals = 0) {
    return value.toFixed(decimals)
  }
})

// --- exports -------------------------------------------------------

export default useI18n
