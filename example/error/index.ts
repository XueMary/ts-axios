
import axios from '../../src/index'


axios({
  method: 'post',
  url: '/error/post',
  responseType:'json',
  data: {
    a:1,
    b:2
  }
}).then(res=>{
  console.log(res)
})
.catch(err=>{
  console.log(err.message)
})

axios({
  method: 'post',
  url: '/error/posts',
  responseType:'json',
  data: {
    a:1,
    b:2
  }
}).then(res=>{
  console.log(res)
})
.catch(err=>{
  console.log(err.message)
})

axios({
  method: 'post',
  url: '/error/post',
  responseType:'json',
  timeout: 1000,
  data: {
    a:1,
    b:2
  }
}).then(res=>{
  console.log(res)
})
.catch(err=>{
  console.log(err.message)
  console.log(err.config)
  console.log(err.code)
})

setTimeout(() => {
  axios({
    method: 'post',
    url: '/error/post',
    responseType:'json',
    data: {
      a:1,
      b:2
    }
  }).then(res=>{
    console.log(res)
  })
  .catch(err=>{
    console.log(err.message)
  })
}, 5000);
