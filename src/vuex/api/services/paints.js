import axios from 'axios'

export default {
  getPaints (request = {}) {
    return axios.get('/paints', request)
          .then((response) => Promise.resolve(response))
          .catch((error) => Promise.reject(error))
  }
}
