import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const IdKey = 'Admin-Id'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
export function getId() {
  return Cookies.get(IdKey)
}

export function setId(id) {
  return Cookies.set(IdKey, id)
}

export function removeId() {
  return Cookies.remove(IdKey)
}
