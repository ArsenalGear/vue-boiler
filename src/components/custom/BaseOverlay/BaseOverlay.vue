<script setup lang="ts">
import BaseText from '@/components/UI/BaseText/BaseText.vue'
type TOverlay = { text: string }
const props = defineProps<TOverlay>()
</script>

<template>
  <div class="styled-overlay">
    <div class="progress-wrapper">
      <div class="progress-bar"></div>
      <!--      todo props.text-->
      <!--      todo style="color: #ccc"-->
      <BaseText style="color: #ccc" type="p">{{ $t(props.text || 'empty') }}</BaseText>
    </div>
  </div>
</template>

<style lang="scss">
@import '@/assets/styles/functions';
.styled-overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  opacity: 1;
  transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2000;
  color: white;
}
.progress-wrapper {
  position: fixed;
  left: 50%;
  top: 50%;
  display: flex;
  text-align: center;
  flex-direction: column;
  transform: translate(-50%, -50%);
}
.progress-bar {
  position: relative;
  width: rem(400);
  height: rem(8);
  margin-bottom: rem(8);
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background-color: #ccc;
  animation: progress-animation 2s infinite;
}

@keyframes progress-animation {
  0% {
    left: -100%;
  }
  50% {
    left: 0;
  }
  100% {
    left: 100%;
  }
}
</style>
