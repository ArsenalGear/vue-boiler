import { createStore, Store } from 'vuex'
import VuexPersistence from 'vuex-persist'
import { themeModule } from '@/store/themeModule'
import { authModule } from '@/store/authModule'
import type { RootState } from '@/store/types'

const vuexPersist = new VuexPersistence<RootState>({
  key: 'my-app',
  storage: localStorage
})

const store: Store<RootState> = createStore<RootState>({
  state: {
    count: 2
  },
  modules: {
    auth: authModule,
    theme: themeModule
  },
  plugins: [vuexPersist.plugin]
})

export default store
