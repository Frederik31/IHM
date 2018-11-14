import axios from 'axios'

export default {
  getPseudo (request = {}) {
    return axios.get('/pseudo', request)
          .then((response) => Promise.resolve(response))
          .catch((error) => Promise.reject(error))
  }
}
