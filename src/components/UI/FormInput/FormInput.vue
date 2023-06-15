<script setup lang="ts">
import { toRefs, defineEmits } from 'vue'

import BaseText from '@/components/UI/BaseText/BaseText.vue'
import themeMixin from '@/mixins/themeMixin'

type TInput = {
  required?: boolean
  loginInput?: boolean
  placeholder?: string
  label?: string
  name: string
  value: string | number
}

const props = defineProps<TInput>()
const { placeholder, label, loginInput, required } = toRefs(props)
const emit = defineEmits(['input'])
const { palette } = themeMixin()

const getInputValue = (value: string) => {
  emit('input', value)
}
</script>

<template>
  <div class="title-input-wrapper">
    <BaseText style="margin-bottom: 0.2rem" class="small-text" type="p">{{ label }}</BaseText>
    <p v-if="required" class="input-required">*</p>
  </div>

  <div :class="{ 'form-input-wrapper': true, loginInput: loginInput }">
    <!-- //todo emit-->

    <input
      :name="name"
      :placeholder="placeholder"
      class="form-input"
      :value="value"
      @input="(e) => getInputValue(e.target.value)"
    />
  </div>
</template>

<style lang="scss">
@import '@/assets/styles/functions';

.input-required {
  margin: 0 0 0 0.125rem;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1rem;
  letter-spacing: 0.00938em;
  color: rgb(252, 119, 154);
}

.title-input-wrapper {
  display: flex;
}
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
    border-radius: rem(8);
    border: 1px solid v-bind('palette.formInputBorder');
    &:hover {
      border: 1px solid v-bind('palette.formInputBorderHover');
    }

    &.loginInput {
      background: #ffffff;
      border: unset;
      height: 2.5rem;
      border-radius: 0.5rem;
      & input {
        color: #19212f;
      }
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
