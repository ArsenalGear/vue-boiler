<script setup lang="ts">
import {
  defineProps,
  defineEmits,
  toRefs,
  ref,
  Ref,
  onMounted,
  onUnmounted,
  watch,
  reactive
} from 'vue'

import BaseText from '@/components/UI/BaseText/BaseText.vue'
import { getInitialTheme, handleThemeChange } from '@/hooks/useTheme'
import { mapGetters } from '@/hooks/useVuex'
import { TPopUpData } from '@/components/custom/BasePopup/types'

const { getTheme } = mapGetters()

const palette = reactive(getInitialTheme())
const emit = defineEmits(['popupOpen', 'screenWidth', 'popupLeft', 'popupTopFrozen'])
const props: { popUpData: TPopUpData; propsButton: any } = defineProps<{
  popUpData: TPopUpData
  propsButton: any
}>()

const { popUpData, propsButton }: any = toRefs(props)

const popup: Ref<HTMLElement | null> = ref(null)

const hidePopup = () => {
  emit('popupOpen', false)
}

const handleClickOutside = (event: Event) => {
  if (!event.target || !(event.target instanceof HTMLElement)) return
  if (!event.target.closest('.popup')) {
    hidePopup()
  }
}

const handleResize = () => {
  const buttonRect = propsButton.value.getBoundingClientRect()
  const inWidth = window.innerWidth > 1200 ? 150 : 100
  const inHeight =
    window.innerWidth > 1200
      ? Number(popUpData.value.popupTop)
      : Number(popUpData.value.popupTop) - 100
  emit('popupLeft', buttonRect.left - buttonRect.width - inWidth)
  emit('popupTopFrozen', inHeight)
  emit('screenWidth', window.innerWidth)
}

onMounted(() => window.addEventListener('resize', handleResize))

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('resize', handleResize)
})

watch(
  () => getTheme,
  () => handleThemeChange(palette),
  { deep: true }
)
</script>

<template>
  <div v-if="popUpData.isPopupVisible" class="popup-overlay" @click="hidePopup">
    <div
      ref="popup"
      class="popup"
      :style="{ top: `${popUpData.popupTopFrozen}px`, left: `${popUpData.popupLeft}px` }"
      @click.stop
    >
      <div class="popup__wrapper">
        <ul>
          <li>
            <BaseText class="main-regular" type="p">Редактировать</BaseText>
          </li>
          <li>
            <BaseText class="main-regular" type="p">Удалить</BaseText>
          </li>
        </ul>
      </div>
    </div>
  </div>
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
  box-shadow: 0 5px 10px 2px rgba(0, 0, 0, 0.05);
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

<!--<BasePopup-->
<!--    v-if="button"-->
<!--    :popUpData="popUpData"-->
<!--    :button="button"-->
<!--    @popupOpen="popUpData.isPopupVisible = false"-->
<!--    @screenWidth="(value) => (popUpData.screenWidth = value)"-->
<!--    @popupLeft="(value) => (popUpData.popupLeft = value)"-->
<!--    @popupTopFrozen="(value) => (popUpData.popupTopFrozen = value)"-->
<!--/>-->
