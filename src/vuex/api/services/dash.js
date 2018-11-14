import axios from 'axios'

export default {
  getDash (request = {}) {
    return axios.get('/dash', request)
          .then((response) => Promise.resolve(response))
          .catch((error) => Promise.reject(error))
  }
}
