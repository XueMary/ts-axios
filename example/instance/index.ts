
import axios from '../../src/index'

  
axios.post('/instans/post', {
  a: 1,
  b: 2
}).then(res => {
  console.log(res)
})
  .catch(err => {
    console.log(err.message)
  })
