import { AxiosRequestConfig, AxiosResponse } from '../types'

class AxiosError extends Error {
  config: AxiosRequestConfig
  code: string | null | undefined
  request: any
  response: AxiosResponse | undefined
  constructor(
    message: string,
    config: AxiosRequestConfig,
    code?: string | null,
    request?: any,
    response?: AxiosResponse
  ) {
    super(message)

    this.config = config
    this.code = code
    this.request = request
    this.response = response

    Object.setPrototypeOf(this, AxiosError.prototype)
  }
}

export function createError(
  message: string,
  config: AxiosRequestConfig,
  code?: string | null,
  request?: any,
  response?: AxiosResponse
) {
  return new AxiosError(message, config, code, request, response)
}
