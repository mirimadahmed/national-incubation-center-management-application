import axios from 'axios'

const axiosObj = axios.create({
  baseURL: 'https://nicapp.nicpakistan.pk/api/'
})

export default {
  login(email, password) {
    return axiosObj.get(`login.php?email=${email}&password=${password}`)
  },
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
    return axiosObj.get(`get_startup.php?startup_id=${id}`)
  },
  updateStartup(data) {
    return axiosObj.post(`update_startup.php`, data)
  },
  deleteFounder(id) {
    return axiosObj.get(`delete_founder.php?id=${id}`)
  }
}
