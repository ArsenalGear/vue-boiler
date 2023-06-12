<script setup lang="ts">
import { toRefs, reactive, defineEmits, watch } from 'vue'

import BasePagination from '@/components/custom/BasePagination/BasePagination.vue'
import BaseText from '@/components/UI/BaseText/BaseText.vue'
import { TPageData, TTableRow } from '@/components/UI/BaseTable/types'
import { getInitialTheme, handleThemeChange } from '@/hooks/useTheme'
import { mapGetters } from '@/hooks/useVuex'
const { getTheme } = mapGetters()
const palette = reactive(getInitialTheme())

const emit = defineEmits(['pageChanged'])
const props: { data: any[]; columns: TTableRow[]; paginationData: TPageData } = defineProps<{
  data: any[]
  columns: TTableRow[]
  paginationData: TPageData
}>()

const getWidth = (val: string) => ({ width: `${val}` })
const { columns, data } = toRefs(props)

watch(
  () => getTheme,
  () => handleThemeChange(palette),
  { deep: true }
)
</script>

<template>
  <div class="table-block">
    <div class="main-table">
      <div class="main-table__header">
        <div
          v-for="column in columns"
          :key="column.key"
          :style="getWidth(column.width)"
          class="main-table__cell"
        >
          <BaseText class="main-text" type="p">{{ $t(`${column.label}`) }}</BaseText>
        </div>
      </div>
      <div class="main-table__empty-row"></div>
      <div v-for="item in data" :key="item.id" class="main-table__row">
        <div
          v-for="column in columns"
          :key="column.key"
          :style="getWidth(column.width)"
          class="main-table__row-cell"
        >
          <div class="main-table__row-cell_inner">
            <slot :name="column.key" v-bind="{ item, value: item[column.key] }">
              {{ item[column.key] }}
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--todo emit emit('pageChanged', pageNumber-->
  <BasePagination
    :totalItems="paginationData.totalItems"
    :itemsPerPage="paginationData.itemsPerPage"
    :currentPage="paginationData.currentPage"
    @pageChanged="(pageNumber) => emit('pageChanged', pageNumber)"
  />
</template>

<style lang="scss">
@import '@/assets/styles/functions';
.table-block {
  margin: 0 1.5rem;
  padding-bottom: 1.2rem;
  border-bottom: 2px solid v-bind('palette.tableBorder');
  height: calc(100% - 7rem);
  overflow: auto;
  &::-webkit-scrollbar {
    width: 8px; /* Adjust the width as needed */
    border-radius: 4px; /* Add rounded corners */
    background-color: v-bind('palette.paperBackground'); /* Set a background color */
  }

  &::-webkit-scrollbar-thumb {
    background-color: v-bind('palette.tableBorder'); /* Set the color of the scrollbar thumb */
    border-radius: 4px; /* Add rounded corners to the thumb */
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #555; /* Set the color of the scrollbar thumb on hover */
  }
}
.main-table {
  width: 100%;
  display: table;
  border-collapse: collapse;

  &__empty-row {
    height: rem(20);
    width: 100%;
    display: table-row;
  }
  &__header {
    position: sticky;
    top: 0;
    z-index: 1;
    background-color: v-bind('palette.tableHeaderBackgroundActive');
    display: table-row;
  }
  &__row {
    height: rem(48);
    display: table-row;
    cursor: pointer;

    &:nth-child(odd) .main-table__row-cell {
      background-color: v-bind('palette.tableRowBackground');
    }

    &:hover .main-table__row-cell {
      background-color: v-bind('palette.tableRowBackgroundActive');

      & g {
        fill: white;
      }

      &:first-child {
        border-bottom-left-radius: rem(8);
        border-top-left-radius: rem(8);
      }
      &:last-child {
        border-bottom-right-radius: rem(8);
        border-top-right-radius: rem(8);
      }
    }
    &:nth-child(odd) .main-table__row-cell:first-child {
      border-bottom-left-radius: rem(8);
      border-top-left-radius: rem(8);
    }
    &:nth-child(odd) .main-table__row-cell:last-child {
      border-bottom-right-radius: rem(8);
      border-top-right-radius: rem(8);
    }

    &-cell {
      padding: rem(5) rem(28);
      display: table-cell;
      vertical-align: middle;

      &_inner {
        width: 100%;
        display: flex;
        align-items: center;
        gap: rem(4);
      }
    }
  }
  &__cell {
    padding: rem(12) rem(22);
    display: table-cell;
    vertical-align: middle;
    border-bottom: 2px solid v-bind('palette.tableBorder');
  }
}
</style>
