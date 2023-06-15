<script lang="ts" setup="">
import { useHead } from '@vueuse/head'
import { onBeforeMount, onUnmounted, reactive } from 'vue'
import { watch } from 'vue'

import FormInput from '@/components/UI/FormInput/FormInput.vue'
import BaseSvg from '@/components/custom/BaseSvg/BaseSvg.vue'
import { ContextMenu } from '@/assets/images/imageConstants'
import FormButton from '@/components/UI/FormButton/FormButton.vue'
import { addRepo, deleteRepo, editRepo, getRepo } from '@/api/repositoriesAPI'
import BaseText from '@/components/UI/BaseText/BaseText.vue'
import BaseWrapper from '@/components/custom/BaseWrapper/BaseWrapper.vue'
import BaseModal from '@/components/custom/BaseModal/BaseModal.vue'
import BaseTable from '@/components/UI/BaseTable/BaseTable.vue'
import { mapMutations, mapGetters } from '@/hooks/useVuex'
import themeMixin from '@/mixins/themeMixin'
import paginationMixin from '@/mixins/paginationMixin'
import popupMixin from '@/mixins/popupMixin'
import { TFormDataRepo, TRepositories, TRepositoriesList } from '@/views/repositories/types'
import { schemaRepo } from '@/views/repositories/constants'
import modalMixin from '@/mixins/modalMixin'

const { 'auth/setOverlayText': setOverlayText, 'auth/setModalOpen': setModalOpen } = mapMutations()
const { 'auth/getIsModalOpen': getIsModalOpen } = mapGetters()

const { palette } = themeMixin()
const { modalData } = modalMixin()
const { pageData } = paginationMixin()
const {
  button,
  popup,
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

const formDataRepo: TFormDataRepo = reactive({
  name: '',
  url: '',
  token: '',
  username: '',
  id: '',
  type: 'GIT',
  isButtonDisabled: true
})

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

const handleEditRepo = () => {
  modalData.type = 'edit'
  setModalOpen(true)
  hidePopup()
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
  await deleteRepo(formDataRepo.id, setOverlayText)
  await handleGetRepo(1)
}

const clearFormData = () => {
  formDataRepo.isButtonDisabled = true
  formDataRepo.name = ''
  formDataRepo.url = ''
  formDataRepo.token = ''
  formDataRepo.username = ''
  formDataRepo.id = ''
}

const handleAddRepo = async (): Promise<void> => {
  if (modalData.type === 'edit') {
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
            modalData.type = 'create'
            setModalOpen(true)
          }
        "
        >{{ $t('add') }}</FormButton
      >
    </div>

    <div v-if="isPopupVisible" class="popup-overlay" @click="hidePopup">
      <div
        ref="popup"
        class="popup"
        :style="{ top: `${popupTop}px`, left: `${popupLeft}px` }"
        @click.stop
      >
        <div class="popup__wrapper">
          <ul>
            <li>
              <BaseText @click="handleEditRepo" class="main-regular" type="p">{{
                $t('edit')
              }}</BaseText>
            </li>
            <li>
              <BaseText
                @click="
                  () => {
                    modalData.type = 'delete'
                    setModalOpen(true)
                    hidePopup()
                  }
                "
                class="main-regular"
                type="p"
                >{{ $t('delete') }}</BaseText
              >
            </li>
          </ul>
        </div>
      </div>
    </div>

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
      :title="modalData.type === 'create' ? $t('createRepo') : $t('editRepo')"
      v-if="modalData.type === 'create' || modalData.type === 'edit'"
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
      v-if="modalData.type === 'delete'"
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

//.popup-overlay {
//  position: fixed;
//  top: 0;
//  left: 0;
//  width: 100%;
//  height: 100%;
//  display: flex;
//  align-items: center;
//  justify-content: center;
//}
//
//.popup {
//  position: absolute;
//  padding: rem(10) 0;
//  background-color: v-bind('palette.paperBackground');
//  border-radius: 4px;
//  box-shadow: rgba(0, 0, 0, 0.2) 0 5px 5px -3px, rgba(0, 0, 0, 0.14) 0px 8px 10px 1px,
//    rgba(0, 0, 0, 0.12) 0px 3px 14px 2px;
//  overflow: hidden auto;
//  outline: 0;
//  opacity: 1;
//  transform: none;
//  transition: opacity 239ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
//    transform 159ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
//  transform-origin: 173px 0;
//
//  & li {
//    margin-bottom: rem(6);
//    padding: rem(8) rem(20);
//    cursor: pointer;
//    &:hover {
//      background: v-bind('palette.menuItemHover');
//    }
//    &:last-child {
//      margin: 0;
//    }
//  }
//}
</style>
