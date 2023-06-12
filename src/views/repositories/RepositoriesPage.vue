<script lang="ts" setup="">
import { useHead } from '@vueuse/head'
import { onBeforeMount, reactive } from 'vue'
import { watch } from 'vue'

import BaseSvg from '@/components/custom/BaseSvg/BaseSvg.vue'
import { ContextMenu } from '@/assets/images/imageConstants'
import FormButton from '@/components/UI/FormButton/FormButton.vue'
import { getRepo } from '@/api/repositoriesAPI'
import BaseText from '@/components/UI/BaseText/BaseText.vue'
import BaseWrapper from '@/components/custom/BaseWrapper/BaseWrapper.vue'
import BaseTable from '@/components/UI/BaseTable/BaseTable.vue'
import { mapGetters, mapMutations } from '@/hooks/useVuex'
import { TPageData } from '@/components/UI/BaseTable/types'
import { TRepositories, TRepositoriesList } from '@/views/repositories/types'
import { getInitialTheme, handleThemeChange } from '@/hooks/useTheme'

const { getTheme } = mapGetters()

const palette = reactive(getInitialTheme())

useHead({
  title: 'Репозитории',
  meta: [
    {
      name: 'description',
      content: 'Описание'
    }
  ]
})

const { 'auth/setOverlayText': setOverlayText } = mapMutations()

const repositories: TRepositoriesList = reactive<TRepositoriesList>({ data: [] })

const tableColumns = reactive([
  { key: 'name', label: 'repo', width: '30%' },
  { key: 'url', label: 'address', width: '30%' },
  { key: 'username', label: 'user', width: '30%' },
  { key: 'id', label: 'empty', width: '10%' }
])

const pageData: TPageData = reactive<TPageData>({
  totalItems: 0,
  itemsPerPage: 15,
  currentPage: 1
})

const handleButtonClick = (item: { id: string }, key: string) => {
  console.log(`Нажата кнопка ${key} для элемента`)
  console.log('123', item.id)
}

const handlePageChange = async (page: number): Promise<void> => {
  const response = await getRepo(page, repositories, setOverlayText, pageData)
  if (response) {
    const { data, totalPages }: { data: TRepositories[]; totalPages: number } = response
    repositories.data = data
    pageData.totalItems = totalPages
  }
}

watch(
  () => getTheme,
  () => handleThemeChange(palette),
  { deep: true }
)

onBeforeMount(() => handlePageChange(pageData.currentPage))
</script>

<template>
  <BaseWrapper :menu-title="'menu'" :content-title="'repositories'">
    <div class="repositories-header">
      <FormButton>{{ $t('add') }}</FormButton>
    </div>
    <BaseTable
      @pageChanged="handlePageChange"
      :paginationData="pageData"
      :data="repositories.data"
      :columns="tableColumns"
    >
      <template v-for="column in tableColumns" #[column.key]="{ item }">
        <BaseText v-if="column.key === 'name'" :key="column.key" class="small-text" type="p">{{
          item.name
        }}</BaseText>

        <BaseText v-else-if="column.key === 'url'" :key="column.key" class="small-text" type="p">
          {{ item.url }}
        </BaseText>
        <BaseText
          v-else-if="column.key === 'username'"
          :key="column.key"
          class="small-text"
          type="p"
          >{{ item.username }}</BaseText
        >

        <BaseSvg
          v-else
          :key="column.key"
          @click="handleButtonClick(item, column.key)"
          :width="`24`"
          :height="`24`"
          :icon-path="ContextMenu"
          :icon-color="palette.contextMenuColor"
        />
      </template>
    </BaseTable>
  </BaseWrapper>
</template>

<style lang="scss">
@import '@/assets/styles/functions';
.repositories-header {
  padding: rem(10) rem(26);
}
</style>
