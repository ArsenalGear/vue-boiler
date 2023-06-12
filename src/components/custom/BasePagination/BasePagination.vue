<script setup lang="ts">
import { toRefs, defineEmits, ref } from 'vue'
import { computed } from 'vue'

type TPagination = { totalItems: number | string; itemsPerPage: number; currentPage: number }

const props = defineProps<TPagination>()
const { totalItems, itemsPerPage } = toRefs(props)
const emit = defineEmits(['pageChanged'])

const currentPage = ref(props.currentPage)

const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage.value))

const goToPage = (pageNumber: number) => {
  if (pageNumber >= 1 && pageNumber <= totalPages.value) {
    currentPage.value = pageNumber
    emit('pageChanged', pageNumber)
  }
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    emit('pageChanged', currentPage.value)
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    emit('pageChanged', currentPage.value)
  }
}

const goToFirstPage = () => {
  currentPage.value = 1
  emit('pageChanged', 1)
}

const goToLastPage = () => {
  currentPage.value = totalPages.value
  emit('pageChanged', totalPages.value)
}
</script>

<template>
  <div class="pagination">
    <button @click="goToFirstPage" :disabled="currentPage === 1">First</button>
    <button @click="previousPage" :disabled="currentPage === 1">Previous</button>

    <div v-for="pageNumber in totalPages" :key="pageNumber">
      <button @click="goToPage(pageNumber)" :class="{ active: currentPage === pageNumber }">
        {{ pageNumber }}
      </button>
    </div>

    <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    <button @click="goToLastPage" :disabled="currentPage === totalPages">Last</button>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
}

button {
  margin: 0 5px;
  padding: 5px 10px;
  border: none;
  background-color: #f1f1f1;
  cursor: pointer;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

button.active {
  font-weight: bold;
}
</style>
