<script setup lang="ts">
import { watch, reactive, toRefs } from 'vue'

import { mapState } from '@/hooks/useVuex'
import { getInitialTheme, handleThemeChange } from '@/hooks/useTheme'

type TInput = { placeholder: string; name: string }

const { theme } = mapState()
const props = defineProps<TInput>()
const { placeholder } = toRefs(props)
const palette = reactive(getInitialTheme())
defineEmits(['input'])

watch(
  () => theme.value.themeColor,
  () => handleThemeChange(palette)
)
</script>

<template>
  <div class="form-input-wrapper">
    <!-- //todo emit-->
    <input
      :name="name"
      :placeholder="placeholder"
      class="form-input"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<style lang="scss">
@import '@/assets/styles/functions';
.form-input {
  width: 100%;
  min-width: 0;
  height: rem(20);
  display: block;
  font: rem(14) / rem(16) Roboto-Regular;
  background: transparent;
  color: v-bind('palette.textColor');
  letter-spacing: 0.02857em;
  outline: 0;
  border: 0;
  margin: 0;
  text-transform: none;
  overflow: visible;
  transition: 0.2s;

  &-wrapper {
    display: flex;
    align-items: center;
    padding: rem(6) rem(12);
    background: v-bind('palette.formInputBackground');
    border-radius: 4px;
    border: 1px solid v-bind('palette.formInputBorder');
    &:hover {
      border: 1px solid v-bind('palette.formInputBorderHover');
    }
  }

  &:disabled {
    cursor: not-allowed;
    &:hover {
      opacity: 1;
    }
  }
}
</style>
