<script lang="ts" setup="">
import { useHead } from '@vueuse/head'

import BaseWrapper from '@/components/custom/BaseWrapper/BaseWrapper.vue'
useHead({
  title: 'Главная страница',
  meta: [
    {
      name: 'description',
      content: 'Описание'
    }
  ]
})
</script>

<template>
  <BaseWrapper :menu-title="'menu'" :content-title="'dashboard'"> <p>content</p> </BaseWrapper>
</template>

<style lang="scss">
@import '@/assets/styles/functions';
</style>
