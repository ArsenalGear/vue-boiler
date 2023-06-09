<script lang="ts" setup="">
import BaseText from '@/components/UI/BaseText/BaseText.vue'
import BasePaper from '@/components/custom/BasePaper/BasePaper.vue'
type TContentBlock = { title: string }
const props = defineProps<TContentBlock>()
</script>

<template>
  <div class="content-block">
    <BaseText type="h2">{{ $t(props.title) }}</BaseText>
    <BasePaper><slot /></BasePaper>
  </div>
</template>

<style lang="scss">
@import '@/assets/styles/functions';
.content-block {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-left: 1.5rem;
}
</style>
