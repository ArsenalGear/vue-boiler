<script lang="ts" setup="">
import { useHead } from '@vueuse/head'

import FormButton from '@/components/UI/FormButton/FormButton.vue'
import BaseWrapper from '@/components/custom/BaseWrapper/BaseWrapper.vue'
useHead({
  title: 'Репозитории',
  meta: [
    {
      name: 'description',
      content: 'Описание'
    }
  ]
})
</script>

<template>
  <BaseWrapper :menu-title="'menu'" :content-title="'repositories'">
    <div class="repositories-header">
      <FormButton>{{ $t('add') }}</FormButton>
    </div>
  </BaseWrapper>
</template>

<style lang="scss">
@import '@/assets/styles/functions';
.repositories-header {
  padding: rem(8) rem(26);
}
</style>
