import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'
// import { createError } from './helpers/error'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers, responseType, timeout } = config

    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }
    if (timeout) {
      request.timeout = timeout
    }

    request.open(method.toUpperCase(), url, true)

    request.onreadystatechange = () => {
      if (request.readyState !== 4) {
        return
      }

      if (request.status === 0) {
        return
      }
      const responseHeader = parseHeader(request.getAllResponseHeaders())
      const responseData = responseType === 'text' ? request.responseText : request.response
      const { status, statusText } = request
      const response: AxiosResponse = {
        status,
        statusText,
        request,
        config,
        headers: responseHeader,
        data: responseData
      }
      responseStatus(response)
    }
    request.onerror = () => {
      reject(new Error('Notwork Error'))
      // reject(createError('Notwork Error', config, null, request))
    }
    request.ontimeout = () => {
      reject(new Error(`Timeout of ${timeout} ms exceeded`))
      // reject(createError(`Timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', request))
    }

    function responseStatus(response: AxiosResponse): void {
      const { status } = response
      if (status >= 200 && status <= 300) {
        resolve(response)
      } else {
        reject(
          new Error(`Request failed with status code ${status}`)
          // createError(`Request failed with status code ${status}`, config, null, request, response)
        )
      }
    }

    Object.keys(headers).forEach(name => {
      if (data === null && name.toUpperCase() === 'Content-Type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    request.send(data)
  })
}

function parseHeader(headers: string): any {
  let parsed = Object.create(null)
  if (!headers) {
    return parsed
  }

  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) {
      return
    }
    if (val) {
      val = val.trim()
    }
    parsed[key] = val
  })

  return parsed
}
