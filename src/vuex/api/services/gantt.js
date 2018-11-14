import axios from 'axios'

export default {
  getGantt () {
    return axios.get('/gantt')
          .then((response) => Promise.resolve(response))
          .catch((error) => Promise.reject(error))
  },

  updateGantt (msn, type, value) {
    return axios.post('/gantt', {
      msn, type, value
    })
    .then((response) => Promise.resolve(response))
    .catch((error) => Promise.reject(error))
  }
}
