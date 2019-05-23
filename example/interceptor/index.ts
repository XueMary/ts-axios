
import axios from '../../src/index'


axios.interceptors.request.use(config=>{
  console.log(config,1)
  return config
})
const requestEject = axios.interceptors.request.use(config=>{
  console.log(config,2)
  return config
})
axios.interceptors.request.use(config=>{
  console.log(config,3)
  return config
})

axios.interceptors.request.eject(requestEject)


axios.interceptors.response.use(res=>{
  console.log(res,999)
  return res
})
  
axios.post('/instans/post', {
  a: 1,
  b: 2
}).then(res => {
  console.log(res)
})
.catch(err => {
  console.log(err.message)
})
