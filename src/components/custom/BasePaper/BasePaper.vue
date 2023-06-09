<script lang="ts" setup="">
import { reactive, watch } from 'vue'

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
  <div class="paper">
    <div class="paper__block">
      <div class="paper__wrapper"><slot /></div>
    </div>
  </div>
</template>

<style lang="scss">
@import '@/assets/styles/functions';
.paper {
  width: 100%;
  height: 100%;
  margin-top: rem(24);
  display: flex;
  flex-direction: column;
  transition: all 0.5s ease 0s;

  &__block {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 1rem;
    overflow-y: auto;
  }

  &__wrapper {
    width: 100%;
    height: 100%;
    padding: 1rem 0 1rem;
    background: v-bind('palette.paperBackground');
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    border-radius: 1rem;
    box-shadow: none;
  }
}
</style>
