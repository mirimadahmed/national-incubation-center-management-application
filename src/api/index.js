import axios from 'axios'

const axiosObj = axios.create({
  baseURL: 'https://bookable.pk/nic/api/'
})

export default {
  users () {
    return axiosObj.get(`users.php`)
  },
  startups () {
    return axiosObj.get(`startups.php`)
  },
  techs () {
    return axiosObj.get(`techs.php`)
  },
  industries () {
    return axiosObj.get(`industries.php`)
  }
}
