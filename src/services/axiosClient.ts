import { LocalStorage } from "@/utils/LocalStorage"
import { BASE_URL } from "@/utils/constants"
import axios, { AxiosResponse } from "axios"

let isRefreshing = false
let failedQueue: any = []

const processQueue = (error: any, token: any = null) => {
  failedQueue.forEach((prom: any) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })

  failedQueue = []
}

const axiosClient = axios.create({
  baseURL: BASE_URL,
})

// Add a request interceptor
axiosClient.interceptors.request.use(
  (config) => {
    const token = LocalStorage.getAccessToken()
    if (token) {
      config.headers["Authorization"] = "Bearer " + token
    }

    return config
  },
  (error) => {
    Promise.reject(error)
  },
)

//Add a response interceptor
axiosClient.interceptors.response.use(
  (response) => {
    return handleResponse(response)
  },
  (error) => {
    const originalRequest = error.config
    const check = originalRequest.url.includes("auth/signIn") || originalRequest.url.includes("auth/signUp")

    if ([400, 401, 403]?.includes(error?.response?.status) && !originalRequest._retry && !check) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = "Bearer " + token
            return axiosClient.request(originalRequest)
          })
          .catch((err) => {
            return Promise.reject(err)
          })
      }

      originalRequest._retry = true
      isRefreshing = true
      const refreshToken = LocalStorage.getRefreshToken()

      return new Promise(function (resolve, reject) {
        axios
          .post(`/users/refresh-token`, { refresh_token: refreshToken })
          .then((res) => {
            const data = res.data
            // 1) put token to LocalStorage
            LocalStorage.setToken(data.access_token)
            LocalStorage.setRefreshToken(data.refresh_token)

            // 2) Change Authorization header
            axios.defaults.headers.common["Authorization"] = "Bearer " + data.access_token
            originalRequest.headers["Authorization"] = "Bearer " + data.access_token
            processQueue(null, data.access_token)

            // 3) return originalRequest object with Axios
            resolve(axiosClient.request(originalRequest))
          })
          .catch((err) => {
            // const { status, data } = err.response

            // if (status === 404) {
            //   clearAuthToken();
            // }
            // if (data && data.error.errorCode === "REFRESH_TOKEN_INVALID") {
            //   clearAuthToken();
            // }
            // if (status === 403 || status === 400) {
            //   LocalStorage.clearToken()
            // }

            processQueue(err, null)
            reject(err)
          })
          .finally(() => {
            isRefreshing = false
          })
      })
    }

    return handleError(error)
  },
)

const handleResponse = (res: AxiosResponse<any>) => {
  return res
}

const handleError = (error: { response: { data: any } }) => {
  const { data } = error.response
  console.error(error)
  return data
}

export default axiosClient
