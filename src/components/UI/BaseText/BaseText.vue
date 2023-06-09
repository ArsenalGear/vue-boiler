<script setup lang="ts">
import { watch, reactive, toRefs } from 'vue'

import { mapGetters } from '@/hooks/useVuex'
const { getTheme } = mapGetters()
import { getInitialTheme, handleThemeChange } from '@/hooks/useTheme'

type TBaseText = { type: string }

const palette = reactive(getInitialTheme())
const props = defineProps<TBaseText>()
const { type } = toRefs(props)

watch(
  () => getTheme.value,
  () => handleThemeChange(palette)
)
</script>

<template>
  <p v-if="type === 'p'" class="main-text">
    <slot />
  </p>
  <h1 v-else-if="type === 'h1'">
    <slot />
  </h1>
  <h2 v-else-if="type === 'h2'">
    <slot />
  </h2>
  <h3 v-else>
    <slot />
  </h3>
</template>

<style lang="scss">
@import '@/assets/styles/functions';
.main-text {
  margin: 0;
  padding: 0;
  color: v-bind('palette.textColor');
  letter-spacing: 0.00938em;
  font: rem(16) / rem(18) Roboto-Medium;
}
h1 {
  margin: 0 0 rem(24);
  font: rem(24) / rem(28) Roboto-Bold;
  letter-spacing: 0;
  color: v-bind('palette.textColor');
}
h2 {
  margin: 0;
  font: rem(24) / rem(28) Roboto-Light;
  letter-spacing: 0;
  color: v-bind('palette.textColor');
}
h3 {
  margin: 0;
  font: rem(20) / rem(28) Roboto-Light;
  letter-spacing: 0;
  color: v-bind('palette.textColor');
}
</style>
