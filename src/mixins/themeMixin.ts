import { ref, watch } from 'vue'

import { getInitialTheme, handleThemeChange } from '@/hooks/useTheme'
import store from '@/store'

const themeMixin = () => {
  const palette = ref(getInitialTheme())

  watch(
    () => store.getters.getTheme,
    () => handleThemeChange(palette.value),
    { deep: true }
  )

  return {
    palette
  }
}

export default themeMixin
