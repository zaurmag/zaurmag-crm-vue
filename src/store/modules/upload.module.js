import axios from 'axios'

export default {
  namespaced: true,
  actions: {
    async save() {
      const data = await axios.post('http://127.0.0.1:2222/api/save')
      console.log(data)
    }
  }
}
