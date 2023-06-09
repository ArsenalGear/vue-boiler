<script lang="ts" setup="">
import { reactive } from 'vue'
import { watch } from 'vue'

import { getInitialTheme, handleThemeChange } from '@/hooks/useTheme'
import { mapGetters } from '@/hooks/useVuex'
const { getTheme } = mapGetters()
const palette = reactive(getInitialTheme())

watch(
  () => getTheme.value,
  () => handleThemeChange(palette)
)
</script>

<template>
  <div class="dashboard-wrapper">
    <div class="dashboard-wrapper__inner">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
@import '@/assets/styles/functions';
.dashboard-wrapper {
  display: flex;
  width: 100%;
  min-width: 1023px;
  height: 100vh;
  max-height: 100%;
  &__inner {
    width: 100%;
    height: 100%;
    padding-bottom: rem(20);
    background: v-bind('palette.bodyBackground');
  }
}
</style>
