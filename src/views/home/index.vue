<template>
  <div class="home">
    <HelloWorld color="black" msg="У вас нет доступа к этой странице" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HelloWorld from './components/hello-world.vue'

export default defineComponent({
  name: 'HomePage',
  components: { HelloWorld }
})
</script>
