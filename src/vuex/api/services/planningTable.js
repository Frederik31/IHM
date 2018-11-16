import axios from 'axios'

export default {
  getPlanningTable () {
    console.log('on entre')
    return axios.get('/planningTable')
          .then((response) => Promise.resolve(response))
          .catch((error) => Promise.reject(error))
  }
}
