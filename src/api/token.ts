export const getDataFromLocalStorageByKey = (keyName: string): string =>
  localStorage.getItem(keyName) as string

export const getTokenFromLocalStorage = () => {
  const localStorageState = JSON.parse(getDataFromLocalStorageByKey('token'))
  if (localStorageState === null) {
    window.location.reload()
    return null
  }
  const token = JSON.parse(localStorageState.authData).accessToken
  return token || null
}
