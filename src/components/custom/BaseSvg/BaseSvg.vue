<template>
  <svg
    class="svg-block"
    xmlns="http://www.w3.org/2000/svg"
    :opacity="opacity"
    :width="`${width}px`"
    :height="`${height}px`"
    :viewBox="`0 0 ${width} ${height}`"
  >
    <g :fill="iconColor">
      <path :d="iconPath"></path>
    </g>
  </svg>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: '10'
    },
    height: {
      type: String,
      default: '10'
    },
    iconColor: {
      type: String,
      default: 'grey'
    },
    iconPath: {
      type: String,
      default: ''
    },
    opacity: {
      type: Number,
      default: 1
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/functions';
.svg-block {
  width: 18px !important;
  height: 18px !important;
}
</style>
