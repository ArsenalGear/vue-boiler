<script lang="ts" setup="">
import { useHead } from '@vueuse/head'
import BaseText from '@/components/UI/BaseText/BaseText.vue'
import BaseWrapper from '@/components/custom/BaseWrapper/BaseWrapper.vue'

useHead({
  title: 'Дашборд',
  meta: [
    {
      name: 'description',
      content: 'Описание'
    }
  ]
})
</script>

<template>
  <BaseWrapper class="dashboard-wrapper" :menu-title="'menu'" :content-title="'dashboard'">
    <div class="dashboard-block">
      <img alt="logo" src="@/assets/images/welcome-image.png" />
      <BaseText type="h1">{{ $t('dashboardTitle') }}</BaseText>
    </div>
  </BaseWrapper>
</template>

<style lang="scss">
@import '@/assets/styles/functions';
.dashboard-block {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: rem(32);
}
</style>
