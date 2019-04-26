import { isDate, isObject } from './util'

function encode(url: string): string {
  return encodeURIComponent(url)
    .replace('/%40/g', '@')
    .replace('/%3A/ig', ':')
    .replace('/%24/g', '$')
    .replace('/%2C/ig', ',')
    .replace('/%20/g', '+')
    .replace('/%5B/ig', '[')
    .replace('/%5D/ig', ']')
}

export function buildUrl(url: string, params?: any): string {
  if (!params) {
    return url
  }

  const parts: string[] = []

  Object.keys(params).forEach(key => {
    const val = params[key]
    if (val === null || val === 'undefined') {
      return
    }

    let vals = []

    if (Array.isArray(val)) {
      vals = val
      key += '[]'
    } else {
      vals = [val]
    }

    vals.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isObject(val)) {
        val = JSON.stringify(val)
      }

      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })

  const paramsUrl = parts.join('&')

  if (paramsUrl) {
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + paramsUrl
  }

  return url
}
