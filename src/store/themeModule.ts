import type { ThemeState } from '@/store/types'

export const themeModule = {
  state: (): ThemeState => ({
    themeColor: 'light',
    count: 7
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
    getTheme: (state: ThemeState) => state.themeColor,
    // countUp: (state: ThemeState, getters: any, rootState: RootState, rootGetters: any) =>
    //   state.count * 2
    countUp: (state: ThemeState) => state.count * 2
  }
}
