import { AxiosPromise, AxiosRequestConfig, Method } from "../types";
import dispatchAxios from "./dispath";


export default class Axios{
  request(config:AxiosRequestConfig):AxiosPromise{
    return dispatchAxios(config)
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