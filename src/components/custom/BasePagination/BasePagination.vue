<script setup lang="ts">
import { toRefs, defineEmits, ref } from 'vue'
import { computed } from 'vue'
import { reactive, watch } from 'vue'

import BaseSvg from '@/components/custom/BaseSvg/BaseSvg.vue'
import { FastForward, FastBackward, Forward, Backward } from '@/assets/images/imageConstants'
import { getInitialTheme, handleThemeChange } from '@/hooks/useTheme'
import { mapGetters } from '@/hooks/useVuex'

type TPagination = { totalItems: number | string; itemsPerPage: number; currentPage: number }

const { getTheme } = mapGetters()
const palette = reactive(getInitialTheme())
const props = defineProps<TPagination>()
const { totalItems, itemsPerPage } = toRefs(props)
const emit = defineEmits(['pageChanged'])

const currentPage = ref(props.currentPage)

const totalPages = computed(() => Math.ceil(+totalItems.value / itemsPerPage.value))

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

watch(
  () => getTheme,
  () => handleThemeChange(palette),
  { deep: true }
)
</script>

<template>
  <div class="pagination">
    <button @click="goToFirstPage" :disabled="currentPage === 1">
      <BaseSvg
        :disabled="currentPage === totalPages"
        :width="`20`"
        :height="`20`"
        :icon-path="FastBackward"
        :icon-color="palette.contextMenuColor"
      />
    </button>
    <button @click="previousPage" :disabled="currentPage === 1">
      <BaseSvg
        :disabled="currentPage === totalPages"
        :width="`20`"
        :height="`20`"
        :icon-path="Backward"
        :icon-color="palette.contextMenuColor"
      />
    </button>

    <div class="pagination__number" v-for="pageNumber in totalPages" :key="pageNumber">
      <button @click="goToPage(pageNumber)" :class="{ active: currentPage === pageNumber }">
        {{ pageNumber }}
      </button>
    </div>

    <button @click="nextPage" :disabled="currentPage === totalPages">
      <BaseSvg
        :disabled="currentPage === totalPages"
        :width="`20`"
        :height="`20`"
        :icon-path="Forward"
        :icon-color="palette.contextMenuColor"
      />
    </button>
    <button @click="goToLastPage" :disabled="currentPage === totalPages">
      <BaseSvg
        :disabled="currentPage === totalPages"
        :width="`20`"
        :height="`20`"
        :icon-path="FastForward"
        :icon-color="palette.contextMenuColor"
      />
    </button>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/functions';
.pagination {
  display: flex;
  justify-content: end;
  align-items: center;
  padding: rem(22) rem(28) rem(10) rem(28);

  &__number {
    padding: 6px 0 4px 0;
  }

  & button {
    margin: 0 rem(5);
    width: 32px;
    height: 32px;
    border-radius: 8px;
    color: v-bind('palette.paginationTextColor');
    font: 0.875rem / 0.875rem Roboto-Bold;

    &:hover {
      background: v-bind('palette.paginationButtonHover');
    }
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;

    &:hover {
      background: unset;
      border-radius: unset;
    }
  }

  button.active {
    background: v-bind('palette.iconColor');
    color: #ffffff;
  }
}
</style>
