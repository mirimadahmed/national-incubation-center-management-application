import axios from 'axios'

const axiosObj = axios.create({
  baseURL: 'https://nicapi.yenvoo.com/api/'
})

export default {
  users() {
    return axiosObj.get(`users.php`)
  },
  startups() {
    return axiosObj.get(`startups.php`)
  },
  techs() {
    return axiosObj.get(`technologies.php`)
  },
  industries() {
    return axiosObj.get(`industries.php`)
  },
  create(data) {
    return axiosObj.post(`add_startup.php`, data)
  },
  addLogo(data) {
    return axiosObj.post(`upload_logo.php`, data)
  },
  getStartup(id) {
    return axiosObj.get(`mobile_app/get_startup.php?startup_id=${id}`)
  }
}
