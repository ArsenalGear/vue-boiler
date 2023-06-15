<script lang="ts" setup="">
import { useHead } from '@vueuse/head'
import { onBeforeMount, onUnmounted, reactive } from 'vue'
import { watch } from 'vue'

import FormInput from '@/components/UI/FormInput/FormInput.vue'
import BaseSvg from '@/components/custom/BaseSvg/BaseSvg.vue'
import { ContextMenu } from '@/assets/images/imageConstants'
import FormButton from '@/components/UI/FormButton/FormButton.vue'
import BaseText from '@/components/UI/BaseText/BaseText.vue'
import BaseWrapper from '@/components/custom/BaseWrapper/BaseWrapper.vue'
import BaseModal from '@/components/custom/BaseModal/BaseModal.vue'
import BasePopup from '@/components/custom/BasePopup/BasePopup.vue'
import BaseTable from '@/components/UI/BaseTable/BaseTable.vue'
import { mapMutations, mapGetters } from '@/hooks/useVuex'
import themeMixin from '@/mixins/themeMixin'
import paginationMixin from '@/mixins/paginationMixin'
import popupMixin from '@/mixins/popupMixin'
import { TFormDataRepo, TRepositories, TRepositoriesList } from '@/views/repositories/types'
import { schemaRepo } from '@/views/repositories/constants'
import { useRepo } from '@/hooks/useRepositories'
const {
  'auth/setOverlayText': setOverlayText,
  'auth/setModalOpen': setModalOpen,
  'auth/setModalType': setModalType
} = mapMutations()
const { 'auth/getIsModalOpen': getIsModalOpen, 'auth/getModalType': getModalType } = mapGetters()

const { palette } = themeMixin()
const { pageData } = paginationMixin()
const { formDataRepo, addRepo, deleteRepo, editRepo, getRepo } = useRepo()
const {
  button,
  isPopupVisible,
  popupTop,
  popupLeft,
  showPopup,
  hidePopup,
  calculatePopupPosition
} = popupMixin()

useHead({
  title: 'Репозитории',
  meta: [
    {
      name: 'description',
      content: 'Описание'
    }
  ]
})

const repositories: TRepositoriesList = reactive<TRepositoriesList>({ data: [] })
const tableColumns = reactive([
  { key: 'name', label: 'repo', width: '30%' },
  { key: 'url', label: 'address', width: '30%' },
  { key: 'username', label: 'user', width: '30%' },
  { key: 'id', label: 'empty', width: '10%' }
])

const handleOpenPopup = (item: TFormDataRepo, key: string, ev: any) => {
  const y = ev.clientY
  showPopup(y)
  formDataRepo.id = item.id
  formDataRepo.name = item.name
  formDataRepo.url = item.url
  formDataRepo.token = item.token
  formDataRepo.username = item.username
  calculatePopupPosition(y)
}

const handleClickOutside = (event: Event) => {
  if (!event.target || !(event.target instanceof HTMLElement)) return
  if (!event.target.closest('.popup')) {
    hidePopup()
  }
}

const handleGetRepo = async (page: number): Promise<void> => {
  const response = await getRepo(page, repositories, setOverlayText, pageData)
  if (response) {
    const { data, totalPages }: { data: TRepositories[]; totalPages: number } = response
    repositories.data = data
    pageData.totalItems = totalPages
  }
  setModalOpen(false)
}

const handleDeleteRepo = async (): Promise<void> => {
  hidePopup()
  await deleteRepo(formDataRepo.id!, setOverlayText)
  await handleGetRepo(1)
}

const clearFormData = () => {
  formDataRepo.isButtonDisabled = true
  formDataRepo.name = ''
  formDataRepo.url = ''
  formDataRepo.token = ''
  formDataRepo.username = ''
  formDataRepo.id = ''
  setModalType('')
}

const handleAddRepo = async (): Promise<void> => {
  if (getModalType.value === 'edit') {
    await editRepo(formDataRepo, setOverlayText)
  } else {
    await addRepo(formDataRepo, setOverlayText)
  }
  await handleGetRepo(1)
  setModalOpen(false)
}

const isSubmitButtonDisable = (): void => {
  schemaRepo
    .isValid(formDataRepo)
    .then((valid) => {
      formDataRepo.isButtonDisabled = !valid
    })
    .catch((error) => {
      console.error(error)
    })
}

watch(() => formDataRepo, isSubmitButtonDisable, { deep: true })
watch(
  () => getIsModalOpen,
  () => !getIsModalOpen.value && clearFormData(),
  { deep: true }
)

onBeforeMount(() => handleGetRepo(pageData.currentPage))

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <BaseWrapper :menu-title="'menu'" :content-title="'repositories'">
    <div class="repositories-header">
      <FormButton
        @click="
          () => {
            setModalType('create')
            setModalOpen(true)
          }
        "
        >{{ $t('add') }}</FormButton
      >
    </div>

    <BasePopup
      :popupLeft="popupLeft"
      :popupTop="popupTop"
      @hidePopup="hidePopup"
      :isPopupVisible="isPopupVisible"
    />
    <BaseTable
      @pageChanged="handleGetRepo"
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
        <button
          :key="column.key"
          v-else
          ref="button"
          @click="(ev) => handleOpenPopup(item, column.key, ev)"
        >
          <BaseSvg
            :width="`20`"
            :height="`20`"
            :icon-path="ContextMenu"
            :icon-color="palette.contextMenuColor"
          />
        </button>
      </template>
    </BaseTable>

    <BaseModal
      :title="getModalType === 'create' ? $t('createRepo') : $t('editRepo')"
      v-if="getModalType === 'create' || getModalType === 'edit'"
      @handleSaveModal="handleAddRepo"
      :disabled="formDataRepo.isButtonDisabled"
    >
      <form @submit.prevent>
        <div class="form-item-wrapper">
          <FormInput
            name="name"
            :required="true"
            :label="$t('repoName')"
            :value="formDataRepo.name"
            @input="(value) => (formDataRepo.name = value)"
          />
        </div>
        <div class="form-item-wrapper">
          <FormInput
            name="url"
            :required="true"
            :label="$t('address')"
            :value="formDataRepo.url"
            @input="(value) => (formDataRepo.url = value)"
          />
        </div>
        <div class="form-item-wrapper">
          <FormInput
            :required="true"
            name="token"
            :label="$t('token')"
            :value="formDataRepo.token"
            @input="(value) => (formDataRepo.token = value)"
          />
        </div>
        <div class="form-item-wrapper">
          <FormInput
            :required="true"
            name="username"
            :label="$t('userName')"
            :value="formDataRepo.username"
            @input="(value) => (formDataRepo.username = value)"
          />
        </div>
      </form>
    </BaseModal>

    <BaseModal
      v-if="getModalType === 'delete'"
      :title="$t('confirmDelete')"
      @handleSaveModal="handleDeleteRepo"
      :disabled="false"
    >
      <BaseText type="h4">{{ $t('confirmDeleteRepo') }}: {{ formDataRepo.id }} ?</BaseText>
    </BaseModal>
  </BaseWrapper>
</template>

<style lang="scss">
@import '@/assets/styles/functions';
.repositories-header {
  padding: rem(10) rem(26);
}
</style>
