import config from '../config'

const TokenService = {
  saveAuthToken(token) {
    window.localStorage.setItem(config.TOKEN_KEY, token)
  },
  getAuthToken() {
    return window.localStorage.getItem(config.TOKEN_KEY)
  },
  clearAuthToken() {
    console.info('clearing the auth token')
    window.localStorage.removeItem(config.TOKEN_KEY)
  },
  hasAuthToken() {
    return !!TokenService.getAuthToken()
  },
  makeBasicAuthToken(userName) {
    return window.btoa(userName)
  },
}

export default TokenService
