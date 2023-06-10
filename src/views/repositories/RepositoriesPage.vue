<script lang="ts" setup="">
import { useHead } from '@vueuse/head'
import { reactive } from 'vue'

import BaseText from '@/components/UI/BaseText/BaseText.vue'
import FormButton from '@/components/UI/FormButton/FormButton.vue'
import BaseWrapper from '@/components/custom/BaseWrapper/BaseWrapper.vue'
import BaseTable from '@/components/UI/BaseTable/BaseTable.vue'
useHead({
  title: 'Репозитории',
  meta: [
    {
      name: 'description',
      content: 'Описание'
    }
  ]
})

const tableData = reactive([
  { repoName: 'Репозиторий1', currentAddress: 'Адрес1', currentUser: 'user1' },
  { repoName: 'Репозиторий2', currentAddress: 'Адрес2', currentUser: 'user2' },
  { repoName: 'Репозиторий2', currentAddress: 'Адрес3', currentUser: 'user3' }
])

const tableColumns = reactive([
  { key: 'repoNameColumn', label: 'Репозиторий', width: '30%' },
  { key: 'ageColumn', label: 'Адрес', width: '40%' },
  { key: 'addressColumn', label: 'Имя пользователя', width: '30%' }
])

const handleButtonClick = (item, key) => {
  console.log(`Нажата кнопка ${key} для элемента ${item.currentUser}`)
}
</script>

<template>
  <BaseWrapper :menu-title="'menu'" :content-title="'repositories'">
    <div class="repositories-header">
      <FormButton>{{ $t('add') }}</FormButton>
    </div>
    <BaseTable :data="tableData" :columns="tableColumns">
      <template v-for="column in tableColumns" #[column.key]="{ item }">
        <BaseText
          v-if="column.key === 'repoNameColumn'"
          :key="column.key"
          class="small-text"
          type="p"
          >{{ item.repoName }}</BaseText
        >
        <FormButton
          v-else-if="column.key === 'ageColumn'"
          :key="column.key"
          @click="handleButtonClick(item, column.key)"
        >
          {{ item.currentAddress }}
        </FormButton>
        <BaseText v-else :key="column.key" class="small-text" type="p">{{
          item.currentUser
        }}</BaseText>
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
