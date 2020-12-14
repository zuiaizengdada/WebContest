import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    baseURL: 'http://39.101.160.5:8080/Shopping/api/v1',
    timeout: 5000,
    method: 'POST'
  })

  instance.interceptors.request.use(config => {
    return config
  }, err => {
    return err
  })

  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    return err
  })
  return instance(config)
}