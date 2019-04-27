import { isPlainObject } from './util'

function normalizeHeaderName(headers: any, headerName: string): any {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(name => {
    if (headerName !== name && headerName.toUpperCase() === name.toUpperCase()) {
      headers[headerName] = headers[name]
      delete headers[name]
    }
  })
}

export function processHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type')

  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }

  return headers
}
