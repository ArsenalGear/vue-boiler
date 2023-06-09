<script setup lang="ts">
import { mapGetters } from '@/hooks/useVuex'
import { reactive, watch } from 'vue'
import { getInitialTheme, handleThemeChange } from '@/hooks/useTheme'
import BaseOverlay from '@/components/custom/BaseOverlay/BaseOverlay.vue'

const palette = reactive(getInitialTheme())
// todo 'auth/getOverlayText': getOverlayTextй
const { getTheme, 'auth/getOverlayText': getOverlayText } = mapGetters()

watch(
  () => getTheme.value.themeColor,
  () => handleThemeChange(palette)
)
</script>

<template>
  <BaseOverlay v-show="getOverlayText !== 'empty'" :text="getOverlayText" />
  <router-view></router-view>
</template>

<style lang="scss">
* {
  margin: 0;
  //padding: 0;
  box-sizing: border-box;
  //transition: 0.1s;
}
.dashboard-wrapper__inner {
  background: v-bind('palette.bodyBackground');
}
</style>
