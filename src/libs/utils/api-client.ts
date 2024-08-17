import axios, { AxiosError } from 'axios'

export type UninterceptedApiError = {
    message: string | Record<string, string[]>
}

export type SWRPayload<T> = {
  arg: T
}

const apiClient = axios.create({
  baseURL:
    `${process.env.NEXT_PUBLIC_API_ROUTE}` ?? 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
})

console.log("api-client",`${process.env.NEXT_PUBLIC_BASE_URL}/api` )

apiClient.interceptors.response.use(
  (config) => {
    console.log("",config)
    return config
  },
  (error: AxiosError<UninterceptedApiError>) => {

    if (error.response?.data.message) {
      return Promise.reject({
        ...error,
        response: {
          ...error.response,
          data: {
            ...error.response.data,
            message:
              typeof error.response.data.message === 'string'
                ? error.response.data.message
                : Object.values(error.response.data.message)[0][0],
          },
        },
      })
    }
    return Promise.reject(error)
  }
)

export { apiClient }
