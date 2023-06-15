<script setup lang="ts">
import { mapGetters } from '@/hooks/useVuex'
import BaseOverlay from '@/components/custom/BaseOverlay/BaseOverlay.vue'

// todo 'auth/getOverlayText': getOverlayText
const { 'auth/getOverlayText': getOverlayText } = mapGetters()
</script>

<template>
  <BaseOverlay v-show="getOverlayText !== 'empty'" :text="getOverlayText" />
  <router-view></router-view>
</template>

<style lang="scss">
@import '@/assets/styles/functions';
* {
  margin: 0;
  //padding: 0;
  box-sizing: border-box;
  //transition: 0.1s;
}
body {
  margin: 0;
}
</style>
