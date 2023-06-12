<script lang="ts" setup="">
import { useHead } from '@vueuse/head'
import { onBeforeMount, reactive } from 'vue'
import { getRepo } from '@/api/repositoriesAPI'
import BaseText from '@/components/UI/BaseText/BaseText.vue'
import FormButton from '@/components/UI/FormButton/FormButton.vue'
import BaseWrapper from '@/components/custom/BaseWrapper/BaseWrapper.vue'
import BaseTable from '@/components/UI/BaseTable/BaseTable.vue'
import BasePagination from '@/components/custom/BasePagination/BasePagination.vue'
import { mapMutations } from '@/hooks/useVuex'

type TPageData = {
  totalItems: number | string
  itemsPerPage: number
  currentPage: number
}

type TRepositories = {
  id: string
  name: string
  token: string
  type: string
  url: string
  username: string
}

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

const repositories: { data: TRepositories[] } = reactive<{ data: TRepositories[] }>({ data: [] })

const tableColumns = reactive([
  { key: 'name', label: 'repo', width: '30%' },
  { key: 'url', label: 'address', width: '30%' },
  { key: 'username', label: 'user', width: '30%' },
  { key: 'id', label: 'empty', width: '10%' }
])

const handleButtonClick = (item: { id: string }, key: string) => {
  console.log(`Нажата кнопка ${key} для элемента`)
  console.log('123', item.id)
}

const pageData: TPageData = reactive<TPageData>({
  totalItems: 0,
  itemsPerPage: 1,
  currentPage: 1
})

const handlePageChange = async (page: number): Promise<void> => {
  const response = await getRepo(page, repositories, setOverlayText, pageData)
  if (response) {
    const { data, totalPages }: { data: TRepositories[]; totalPages: number } = response
    repositories.data = data
    pageData.totalItems = totalPages
  }
}

onBeforeMount(() => handlePageChange(pageData.currentPage))
</script>

<template>
  <BaseWrapper :menu-title="'menu'" :content-title="'repositories'">
    <div class="repositories-header">
      <FormButton>{{ $t('add') }}</FormButton>
    </div>
    <BaseTable :data="repositories.data" :columns="tableColumns">
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

        <FormButton v-else :key="column.key" @click="handleButtonClick(item, column.key)">
          {{ 1 }}
        </FormButton>
      </template>
    </BaseTable>
    <BasePagination
      :totalItems="pageData.totalItems"
      :itemsPerPage="pageData.itemsPerPage"
      :currentPage="pageData.currentPage"
      @pageChanged="handlePageChange"
    />
  </BaseWrapper>
</template>

<style lang="scss">
@import '@/assets/styles/functions';
.repositories-header {
  padding: rem(10) rem(26);
}
</style>
