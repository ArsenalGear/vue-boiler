export type RootState = {
  userRole: ''
}

export type ThemeState = {
  themeColor: string
}

export type AuthState = {
  overlayText: string
  token: string
  isAuthenticated: boolean
  isModalOpen: boolean
  lang: string
  modalType: string
}
