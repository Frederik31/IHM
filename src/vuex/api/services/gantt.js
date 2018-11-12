import axios from 'axios'

export default {
  getGantt (request = {}) {
    return axios.get('/gantt', request)
          .then((response) => Promise.resolve(response))
          .catch((error) => Promise.reject(error))
  }
}
