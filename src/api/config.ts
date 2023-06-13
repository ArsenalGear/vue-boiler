import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

const getDataFromLocalStorageByKey = (keyName: string): string =>
  localStorage.getItem(keyName) as string

const getTokenFromLocalStorage = () => {
  const localStorageState = JSON.parse(getDataFromLocalStorageByKey('vue-app'))
  if (localStorageState === null) {
    window.location.reload()
    return null
  }
  const token = localStorageState.auth.token
  return token || null
}

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json'
  }
})

axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = getTokenFromLocalStorage()
    config.headers.common.Authorization = token ? `Bearer ${token}` : ''
    return config
  },
  (error) => Promise.reject(error)
)

export const get = (url: string) => axiosInstance.get(url)
export const deleteMethod = (url: string) => axiosInstance.delete(url)
export const post = (url: string, data: any, config?: any) => axiosInstance.post(url, data, config)
// export const put = (url: string, data: any) => axiosInstance.put(url, data)
