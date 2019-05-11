import { AxiosInstance } from "../types";
import Axios from "./Axios";
import { extend } from "../helpers/util";


function createInstance():AxiosInstance{
  const content = new Axios()
  let Instance = Axios.prototype.request.bind(content)

  extend(Instance, content)
  
  return Instance as AxiosInstance
}

const axios = createInstance()

export default axios