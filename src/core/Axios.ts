import { AxiosPromise, AxiosRequestConfig, Method, AxiosResponse, ResolvedFn, RejectedFn } from "../types";
import dispatchAxios from "./dispath";
import InterceptorManager from "./InterceptorManager";


interface PromiseChain<T> {
  resolved: ResolvedFn<T>|((config:AxiosRequestConfig)=>AxiosPromise)
  rejected?: RejectedFn 
}

interface Interceptor {
  request: InterceptorManager<AxiosRequestConfig>
  response: InterceptorManager<AxiosResponse>
}

export default class Axios{
  interceptors:Interceptor
  constructor(){
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosResponse>()
    }
  }

  request(url: any, config?:any):AxiosPromise{
    if(typeof url === 'string'){
      if(!config){
        config = {}
      }
      config.url = url
    }else{
      config = url
    }

    let chain: PromiseChain<any>[] = [{
      resolved: dispatchAxios,
      rejected: undefined
    }]

    this.interceptors.request.forEach(config=>{
      chain.unshift(config)
    })
    this.interceptors.response.forEach(response=>{
      chain.push(response)
    })

    let promise = Promise.resolve(config)

    while(chain.length){
      const {resolved,rejected} = chain.shift()!
      promise = promise.then(resolved,rejected)
    }

    return promise
  }
  get(url:string,config?:AxiosRequestConfig):AxiosPromise{
    return this._requestMthod('get',url,config)
  }
  delete(url:string,config?:AxiosRequestConfig):AxiosPromise{
    return this._requestMthod('get',url,config)
  }
  head(url:string,config?:AxiosRequestConfig):AxiosPromise{
    return this._requestMthod('get',url,config)
  }
  options(url:string,config?:AxiosRequestConfig):AxiosPromise{
    return this._requestMthod('get',url,config)
  }
  post(url:string,data?:any,config?:AxiosRequestConfig):AxiosPromise{
    return this._requestMthodData('post',url,data,config)
  }
  put(url:string,data?:any,config?:AxiosRequestConfig):AxiosPromise{
    return this._requestMthodData('post',url,data,config)
  }
  patch(url:string,data?:any,config?:AxiosRequestConfig):AxiosPromise{
    return this._requestMthodData('post',url,data,config)
  }

  _requestMthod(method:Method,url:string,config?:AxiosRequestConfig){
    return this.request(Object.assign(config||{}, {
      url, method
    }))
  }
  _requestMthodData(method:Method,url:string, data?: any,config?:AxiosRequestConfig){
    return this.request(Object.assign(config||{}, {
      url, method, data
    }))
  }
}