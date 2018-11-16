import axios from 'axios'

export default {
  getMtTable () {
    return axios.get('/mttable')
          .then((response) => Promise.resolve(response))
          .catch((error) => Promise.reject(error))
  }
}
