import type { Dispatch, Commit } from 'vuex'

import { type FormData } from '@/views/login/types'
import { post } from '@/api/config'
import type { AuthState } from '@/store/types'
import router from '@/router'
import { getRepositories } from '@/api/repositoriesAPI'

export const authModule = {
  state: () => ({
    token: '',
    isAuthenticated: false,
    overlayText: 'empty',
    lang: 'ru'
  }),

  getters: {
    getLang(state: AuthState) {
      return state.lang === 'ru' ? 'en' : 'ru'
    },
    getToken(state: AuthState) {
      return state.token
    },
    getAuthStatus(state: AuthState) {
      return state.isAuthenticated
    },
    getOverlayText(state: AuthState) {
      return state.overlayText
    }
  },

  mutations: {
    switchLang: (state: AuthState) => {
      const { lang } = state
      state.lang = lang === 'ru' ? 'en' : 'ru'
    },
    setToken(state: AuthState, token: string) {
      state.token = token
    },
    setAuth(state: AuthState, isAuthenticated: boolean) {
      state.isAuthenticated = isAuthenticated
    },
    setOverlayText(state: AuthState, overlayText: string) {
      state.overlayText = overlayText
    }
  },

  actions: {
    async getOrderMigration({ commit }: { commit: Commit }) {
      try {
        commit('setOverlayText', 'authentication')
        await router.push('/dashboard')
        const result = await getRepositories()
        console.log('result', result)
      } catch (e) {
        console.log(e)
      } finally {
        commit('setOverlayText', 'empty')
      }
    },

    async getTokenAPI(
      { dispatch, commit }: { dispatch: Dispatch; commit: Commit },
      data: FormData
    ) {
      // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
      const { isButtonDisabled, ...rest } = data
      try {
        commit('setOverlayText', 'authorization')
        console.log(12222)
        const result: { id_token: string } = await post(`/authenticate`, rest).then(
          (response) => response.data
        )
        console.log('123', result)
        commit('setToken', result.id_token)
        commit('setAuth', true)
        await dispatch('getOrderMigration')
      } catch (e) {
        console.log(e)
      } finally {
        commit('setOverlayText', 'empty')
      }
    }
  },
  namespaced: true
}
