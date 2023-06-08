<script setup lang="ts">
import { toRefs, watch, reactive } from 'vue'
import { TButtonType } from '@/components/UI/types'
import { mapState } from '@/hooks/useVuex'
import { getInitialTheme, handleThemeChange } from '@/hooks/useTheme'
const { theme } = mapState()
// const props = defineProps({
//   disabled: { type: String, required: true },
// })

const props = defineProps<TButtonType>()

//реактивный пропс
const { disabled } = toRefs(props)

const palette = reactive(getInitialTheme())

watch(
  () => theme.value.themeColor,
  () => handleThemeChange(palette)
)
</script>

<template>
  <button :class="{ disabled: disabled }" class="btn">
    <slot />
  </button>
</template>

<style scoped>
.btn {
  padding: 10px 15px;
  background: none;
  color: v-bind('palette.color');
  border: 1px solid teal;
  cursor: pointer;
  background: v-bind('palette.background');
}
.disabled {
  background: v-bind('theme.backgroundHeader');
}
</style>
