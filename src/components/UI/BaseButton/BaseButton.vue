<script setup lang="ts">
import { toRefs, watch, reactive } from 'vue'

import { mapGetters } from '@/hooks/useVuex'
import { getInitialTheme, handleThemeChange } from '@/hooks/useTheme'

type TBaseButton = { disabled?: boolean }

const { getTheme } = mapGetters()
const props = defineProps<TBaseButton>()
const { disabled } = toRefs(props)
const palette = reactive(getInitialTheme())

watch(
  () => getTheme,
  () => handleThemeChange(palette),
  { deep: true }
)
</script>

<template>
  <button type="button" :disabled="disabled" :class="{ 'base-button': true, disabled: disabled }">
    <slot />
  </button>
</template>

<style lang="scss">
@import '@/assets/styles/functions';
.base-button {
  display: inline-block;
  padding: rem(11) rem(20);
  background: v-bind('palette.baseButtonBackground');
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
  font: rem(16) / rem(18) Roboto-Medium;
  transition: 0.3s;

  &:hover {
    opacity: 0.8;
  }

  &.disabled {
    background: v-bind('palette.baseButtonDisabledBackground');
    cursor: not-allowed;
    &:hover {
      opacity: 1;
    }
  }
}
</style>
