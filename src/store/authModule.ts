import { type FormData } from '@/views/login/types'
import { post, get } from '@/api/config'
import type { AuthState } from '@/store/types'
import type { Dispatch, Commit } from 'vuex'
import router from '@/router'

export const authModule = {
  state: () => ({
    token: '',
    isAuthenticated: false
  }),

  getters: {
    getToken(state: AuthState) {
      return state.token
    },
    getAuthStatus(state: AuthState) {
      return state.isAuthenticated
    }
  },

  mutations: {
    setToken(state: AuthState, token: string) {
      state.token = token
    },
    setAuth(state: AuthState, isAuthenticated: boolean) {
      state.isAuthenticated = isAuthenticated
    }
  },

  actions: {
    async getOrderMigration() {
      try {
        await get(`/migration/status?page=0&size=9`).then((response) => response.data)
      } catch (e) {
        console.log(e)
      } finally {
        // commit('setLoading', false)
      }
    },

    async getTokenAPI(
      { dispatch, commit }: { dispatch: Dispatch; commit: Commit },
      data: FormData
    ) {
      // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
      const { isButtonDisabled, ...rest } = data
      try {
        const result: { id_token: string } = await post(`/authenticate`, rest).then(
          (response) => response.data
        )
        commit('setToken', result.id_token)
        commit('setAuth', true)
        await router.push('/about')
        await dispatch('getOrderMigration')
      } catch (e) {
        console.log(e)
      } finally {
        // commit('setToken', false)по
      }
    }
  },
  namespaced: true
}
