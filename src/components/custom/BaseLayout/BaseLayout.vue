<script lang="ts" setup="">
import { reactive } from 'vue'

import { getInitialTheme } from '@/hooks/useTheme'

const palette = reactive(getInitialTheme())
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
    background: v-bind('palette.bodyBackground');
  }
}
</style>
