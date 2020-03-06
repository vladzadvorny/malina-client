/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
/* eslint-disable prefer-destructuring */
import { h, createContext } from 'preact'
import { useContext } from 'preact/hooks'

import getLocale from 'browser-locale'

import resources from '../translations'

export const languages = Object.keys(resources)

export const LocalizationContext = createContext({})
export const LocalizationConsumer = LocalizationContext.Consumer

let lang = 'en'
let resource = resources[lang]

const setLanguage = newLang => {
  lang = newLang
  resource = resources[lang]
}

const getLanguage = () => {
  return lang
}

const replace = (str, allowable) => {
  let newStr = str

  Object.keys(allowable).forEach(key => {
    newStr = newStr.replace(`{{${key}}}`, allowable[key])
  })

  return newStr
}

const t = trkey => {
  // let obj = {}
  // trkeys.forEach(key => {
  //   if (resource[key] !== undefined) {
  //     obj = { ...obj, ...resource[key] }
  //   }
  // })

  return (string, allowable = {}) => {
    const arr = string.split(':')

    let value

    if (arr.length > 1) {
      arr.forEach((key, i) => {
        // console.log(key)
        if (i === 0) {
          value = resource[key]
        } else {
          value = value[key]
        }
      })
    } else {
      // eslint-disable-next-line no-lonely-if
      if (resource[arr[0]] && typeof resource[arr[0]] === 'string') {
        value = resource[arr[0]]
      } else {
        value = resource[trkey][arr[0]]
      }
    }

    return replace(value, allowable)
  }
}

//
;(() => {
  let locale =
    typeof window === 'undefined'
      ? 'en'
      : getLocale()
          .split('-')[0]
          .toLowerCase()
  locale = languages.indexOf(locale) === -1 ? languages[0] : locale

  let storage =
    typeof window === 'undefined' ? undefined : localStorage.getItem('@locale')
  storage = languages.indexOf(storage) === -1 ? undefined : storage

  // dayjs.locale(storage || locale)
  setLanguage(storage || locale)
})()

export const LocalizationProvider = ({ children }) => (
  <LocalizationContext.Provider
    value={{
      resource,
      setLanguage,
      getLanguage,
      t
    }}
  >
    {children}
  </LocalizationContext.Provider>
)

export const useLocalization = trkey => {
  trkey = trkey || ''
  const l = useContext(LocalizationContext)

  return {
    ...l,
    getLanguage: l.getLanguage,
    setLanguage: l.setLanguage,
    t: l.t(trkey)
  }
}
