<script setup lang="ts">
import { toRefs } from 'vue'

type TTextType = { color: string; msg: string }
const props = defineProps<TTextType>()

//реактивный пропс
const { color, msg } = toRefs(props)
</script>

<template>
  <div class="hello">
    <h1 :style="{ color: color }">{{ msg }}</h1>
  </div>
</template>

<style lang="scss">
@import '@/assets/styles/functions';
.text {
  font: rem(50) / rem(24) Roboto-Regular;

  @include media(500) {
    color: purple;
  }
}
</style>
