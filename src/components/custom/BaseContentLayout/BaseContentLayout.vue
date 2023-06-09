<script lang="ts" setup=""></script>

<template>
  <div class="content-layout">
    <slot />
  </div>
</template>

<style lang="scss">
@import '@/assets/styles/functions';
.content-layout {
  display: flex;
  height: calc(100% - 6.5rem);
  margin-top: -6.75rem;
  padding: 0 rem(20);
  //background: red;
}
</style>
