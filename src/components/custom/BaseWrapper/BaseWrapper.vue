<script lang="ts" setup="">
import BaseHeader from '@/components/custom/BaseHeader/BaseHeader.vue'
import BaseLayout from '@/components/custom/BaseLayout/BaseLayout.vue'
import BaseContentLayout from '@/components/custom/BaseContentLayout/BaseContentLayout.vue'
import BaseMenuBlock from '@/components/custom/BaseMenuBlock/BaseMenuBlock.vue'
import BaseContentBlock from '@/components/custom/BaseContentBlock/BaseContentBlock.vue'
type TBaseWrapper = { menuTitle: string; contentTitle: string }
const props = defineProps<TBaseWrapper>()
</script>

<template>
  <BaseLayout>
    <BaseHeader />
    <BaseContentLayout>
      <BaseMenuBlock :title="props.menuTitle" />
      <BaseContentBlock :title="props.contentTitle">
        <slot />
      </BaseContentBlock>
    </BaseContentLayout>
  </BaseLayout>
</template>

<style lang="scss">
@import '@/assets/styles/functions';
</style>
