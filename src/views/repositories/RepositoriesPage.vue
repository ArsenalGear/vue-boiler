<script lang="ts" setup="">
import { useHead } from '@vueuse/head'
import { onBeforeMount, reactive, ref, onUnmounted, onMounted, Ref } from 'vue'
import { watch } from 'vue'

import BaseSvg from '@/components/custom/BaseSvg/BaseSvg.vue'
import { ContextMenu } from '@/assets/images/imageConstants'
import FormButton from '@/components/UI/FormButton/FormButton.vue'
import { deleteRepo, getRepo } from '@/api/repositoriesAPI'
import BaseText from '@/components/UI/BaseText/BaseText.vue'
import BaseWrapper from '@/components/custom/BaseWrapper/BaseWrapper.vue'
import BaseTable from '@/components/UI/BaseTable/BaseTable.vue'
import { mapGetters, mapMutations } from '@/hooks/useVuex'
import { TPageData } from '@/components/UI/BaseTable/types'
import { TPopUpData, TRepositories, TRepositoriesList } from '@/views/repositories/types'
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
const popUpData: TPopUpData = reactive<TPopUpData>({
  isPopupVisible: false,
  popupTop: 0,
  popupLeft: 0,
  screenWidth: 0,
  id: ''
})

const handleButtonClick = (item: { id: string }, key: string, ev: any) => {
  const y = ev.clientY
  popUpData.isPopupVisible = true
  popUpData.id = item.id
  calculatePopupPosition(y)
}

const button: Ref<HTMLElement | null> = ref(null)
const popup: Ref<HTMLElement | null> = ref(null)

const hidePopup = () => (popUpData.isPopupVisible = false)

const handleClickOutside = (event: Event) => {
  if (!event.target || !(event.target instanceof HTMLElement)) return
  if (!event.target.closest('.popup')) {
    hidePopup()
  }
}

const calculatePopupPosition = (y: number) => {
  if (!button.value) return
  const buttonRect = button.value.getBoundingClientRect()
  popUpData.popupTop = y - 10
  popUpData.popupLeft = buttonRect.left - buttonRect.width - 150
}

const handleResize = () => {
  if (!button.value) return
  const buttonRect = button.value.getBoundingClientRect()
  popUpData.popupLeft = buttonRect.left - buttonRect.width - 150
  popUpData.screenWidth = window.innerWidth
}

const handleEditRepo = () => {
  console.log('handleEditRepo')
  hidePopup()
}

const handleGetRepo = async (page: number): Promise<void> => {
  const response = await getRepo(page, repositories, setOverlayText, pageData)
  if (response) {
    const { data, totalPages }: { data: TRepositories[]; totalPages: number } = response
    repositories.data = data
    pageData.totalItems = totalPages
  }
}

const handleDeleteRepo = async (): Promise<void> => {
  hidePopup()
  await deleteRepo(popUpData.id, setOverlayText)
  await handleGetRepo(1)
}

watch(
  () => getTheme,
  () => handleThemeChange(palette),
  { deep: true }
)

onBeforeMount(() => handleGetRepo(pageData.currentPage))

onMounted(() => window.addEventListener('resize', handleResize))

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <BaseWrapper :menu-title="'menu'" :content-title="'repositories'">
    <div class="repositories-header">
      <FormButton>{{ $t('add') }}</FormButton>
    </div>
    <div v-if="popUpData.isPopupVisible" class="popup-overlay" @click="hidePopup">
      <div
        ref="popup"
        class="popup"
        :style="{ top: `${popUpData.popupTop}px`, left: `${popUpData.popupLeft}px` }"
        @click.stop
      >
        <div class="popup__wrapper">
          <ul>
            <li>
              <BaseText @click="handleEditRepo" class="main-regular" type="p"
                >Редактировать</BaseText
              >
            </li>
            <li>
              <BaseText @click="handleDeleteRepo" class="main-regular" type="p">Удалить</BaseText>
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
          @click="(ev) => handleButtonClick(item, column.key, ev)"
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
  </BaseWrapper>
</template>

<style lang="scss">
@import '@/assets/styles/functions';
.repositories-header {
  padding: rem(10) rem(26);
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup {
  position: absolute;
  padding: rem(10) 0;
  background-color: v-bind('palette.paperBackground');
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.2) 0 5px 5px -3px, rgba(0, 0, 0, 0.14) 0px 8px 10px 1px,
    rgba(0, 0, 0, 0.12) 0px 3px 14px 2px;
  overflow: hidden auto;
  outline: 0;
  opacity: 1;
  transform: none;
  transition: opacity 239ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    transform 159ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  transform-origin: 173px 0;

  & li {
    margin-bottom: rem(6);
    padding: rem(8) rem(20);
    cursor: pointer;
    &:hover {
      background: v-bind('palette.menuItemHover');
    }
    &:last-child {
      margin: 0;
    }
  }
}
</style>
