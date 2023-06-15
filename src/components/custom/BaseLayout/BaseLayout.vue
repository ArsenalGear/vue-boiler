<script lang="ts" setup="">
import themeMixin from '@/mixins/themeMixin'

const { palette } = themeMixin()
</script>

<template>
  <div class="layout-wrapper">
    <div class="layout-wrapper__inner">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
@import '@/assets/styles/functions';
.layout-wrapper {
  display: flex;
  width: 100%;
  min-width: 1023px;
  height: 100vh;
  max-height: 100%;
  &__inner {
    width: 100%;
    height: 100%;
    padding-bottom: rem(20);
    background: v-bind('palette.bodyBackground');
  }
}
</style>
