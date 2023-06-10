<script setup lang="ts">
import { watch, reactive } from 'vue'

import { mapGetters } from '@/hooks/useVuex'
const { getTheme } = mapGetters()
import { getInitialTheme, handleThemeChange } from '@/hooks/useTheme'

const palette = reactive(getInitialTheme())

watch(
  () => getTheme,
  () => handleThemeChange(palette),
  { deep: true }
)
</script>

<template>
  <button class="form-button">
    <slot />
  </button>
</template>

<style lang="scss">
@import '@/assets/styles/functions';
.form-button {
  padding: rem(8) rem(16);
  background: v-bind('palette.formButtonBackground');
  color: v-bind('palette.baseButtonColor');
  cursor: pointer;
  outline: 0;
  border: 0;
  margin: 0;
  user-select: none;
  vertical-align: middle;
  border-radius: rem(8);
  text-transform: none;
  letter-spacing: 0.02857em;
  font: rem(14) / rem(16) Roboto-Medium;
  transition: 0.3s;

  &.cancel {
    background: v-bind('palette.formButtonCancelBackground');
    color: v-bind('palette.baseButtonDisabledColor');
  }

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    background: v-bind('palette.formButtonDisabledBackground');
    color: v-bind('palette.baseButtonDisabledColor');
    cursor: not-allowed;
    &:hover {
      opacity: 1;
    }
  }
}
</style>
