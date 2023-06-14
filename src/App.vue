<script setup lang="ts">
import { reactive, watch } from 'vue'

import { mapGetters } from '@/hooks/useVuex'
import { getInitialTheme, handleThemeChange } from '@/hooks/useTheme'
import BaseOverlay from '@/components/custom/BaseOverlay/BaseOverlay.vue'

const palette = reactive(getInitialTheme())

// todo 'auth/getOverlayText': getOverlayText
const { getTheme, 'auth/getOverlayText': getOverlayText } = mapGetters()

watch(
  () => getTheme,
  () => handleThemeChange(palette),
  { deep: true }
)
</script>

<template>
  <BaseOverlay v-show="getOverlayText !== 'empty'" :text="getOverlayText" />
  <router-view></router-view>
</template>

<style lang="scss">
@import '@/assets/styles/functions';
* {
  margin: 0;
  //padding: 0;
  box-sizing: border-box;
  //transition: 0.1s;
}
body {
  margin: 0;
}
</style>
