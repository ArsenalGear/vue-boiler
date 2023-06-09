import { computed } from 'vue'
import { useStore } from 'vuex'

const mapGetters = () => {
  const store = useStore()
  return Object.fromEntries(
    Object.keys(store.getters).map((getter) => [getter, computed(() => store.getters[getter])])
  )
}

const mapMutations = () => {
  const store: any = useStore()

  return Object.fromEntries(
    Object.keys(store._mutations).map((mutation) => [
      mutation,
      (value: any) => store.commit(mutation, value)
    ])
  )
}

const mapState = () => {
  const store = useStore()
  return Object.fromEntries(
    Object.keys(store.state).map((key) => [key, computed(() => store.state[key])])
  )
}

export { mapGetters, mapMutations, mapState }
