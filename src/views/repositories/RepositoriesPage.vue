<script lang="ts" setup="">
import { useHead } from '@vueuse/head'
import { onBeforeMount, reactive } from 'vue'

import { getRepositories } from '@/api/repositoriesAPI'
import BaseText from '@/components/UI/BaseText/BaseText.vue'
import FormButton from '@/components/UI/FormButton/FormButton.vue'
import BaseWrapper from '@/components/custom/BaseWrapper/BaseWrapper.vue'
import BaseTable from '@/components/UI/BaseTable/BaseTable.vue'
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

const repositories: TRepositories[] = reactive<TRepositories[]>([])
onBeforeMount(async () => {
  const repos: TRepositories[] = await getRepositories()
  repositories.push(...repos)
})

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
</script>

<template>
  <BaseWrapper :menu-title="'menu'" :content-title="'repositories'">
    <div class="repositories-header">
      <FormButton>{{ $t('add') }}</FormButton>
    </div>
    <BaseTable :data="repositories" :columns="tableColumns">
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
  </BaseWrapper>
</template>

<style lang="scss">
@import '@/assets/styles/functions';
.repositories-header {
  padding: rem(10) rem(26);
}
</style>
