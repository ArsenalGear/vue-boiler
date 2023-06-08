import axios from 'axios'
const baseUrl = 'http://admin-gateway.core-banking.cloud/api'
axios.defaults.baseURL = baseUrl
axios.defaults.timeout = 50000
axios.defaults.headers = {
  'Content-Type': 'application/json'
}

axios.interceptors.request.use(
  (config) => {
    if (localStorage && localStorage.getItem('token')) {
      const token = localStorage.getItem('token')
      token && (config.headers.Authorization = token)
    }
    return config
  },
  (error) => {
    console.log(error)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return Promise.error(error)
  }
)

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
axios.interceptors.response.use((response) => {
  const { data } = response
  const token = localStorage.getItem('token')
  if (!token) {
    localStorage.setItem('token', data.id_token)
  }
  if (response.status === 200) {
    if (response.data.code !== '993') {
      return Promise.resolve(response)
    } else {
      console.log('error')
      window.location.href = '/login'
    }
  } else {
    return Promise.reject(response)
  }
})

export function post(url: string, data: any) {
  return axios.post(url, data)
}

export function get(url: string) {
  return axios.get(url)
}

// export function put(url, data) {
//   return axios.put(url, data)
// }

// export function del(url, data) {
//   return axios.delete(url, data)
// }

// export function uploader(url, file) {
//   const params = new FormData()
//   params.append('file', file)
//   return axios.post(url, params)
// }
