import type { ThemeState } from '@/store/types'

export const themeModule = {
  state: (): ThemeState => ({
    themeColor: 'light'
  }),
  mutations: {
    switchTheme: (state: ThemeState, value: string) => {
      state.themeColor = value
    },
    switchThemeShort: (state: ThemeState) => {
      const { themeColor } = state
      state.themeColor = themeColor === 'light' ? 'dark' : 'light'
    }
  },
  getters: {
    getTheme: (state: ThemeState) => state.themeColor
  }
}
