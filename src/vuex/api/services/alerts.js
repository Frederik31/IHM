import axios from 'axios'

export default {
  getAlerts (request = {}) {
    return axios.get('/alerts', request)
          .then((response) => Promise.resolve(response))
          .catch((error) => Promise.reject(error))
  }
}
