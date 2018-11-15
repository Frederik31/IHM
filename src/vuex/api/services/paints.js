import axios from 'axios'

export default {
  getPaints (request = {}) {
    return axios.get('/paints', request)
          .then((response) => Promise.resolve(response))
          .catch((error) => Promise.reject(error))
  },

  updatePaints (type, subtype, values) {
    return axios.post('/paints', {
      name: type, description: subtype, fields: values
    })
    .then((response) => Promise.resolve(response))
    .catch((error) => Promise.reject(error))
  }
}
