import { isPlainObject } from './util'

export function transformRequest(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

export function transformData(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (error) {
      // no thing
    }
  }
  return data
}
