import axios from 'axios'
import nookies from 'nookies'

export const delAuthToken = (ctx = null) => {
  return nookies.destroy(ctx, 'a_t')
}

export const getAuthToken = (ctx = null) => {
  return nookies.get(ctx)['a_t']
}

export const setAuthToken = (ctx = null, token) => {
  return nookies.set(ctx, 'a_t', token, {
    expire: 60 * 60 * 24 * 7,
    path: '/',
    secure: process.env.APP_ENV === 'production'
  })
}

export default (ctx = null) => {
  const serverInstance = axios.create()

  serverInstance.interceptors.request.use((config) => {
    config.baseURL = process.env.API.ENDPOINT
    config.headers['Accept'] = 'application/json'

    const token = getAuthToken(ctx)

    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }

    return config
  })

  return serverInstance
}
