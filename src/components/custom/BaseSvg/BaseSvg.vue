<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :opacity="opacity"
    :width="`${width}`"
    :height="`${height}`"
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
      default: '18'
    },
    height: {
      type: String,
      default: '18'
    },
    iconColor: {
      type: String,
      default: 'red'
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
