<script setup lang="ts">
import { defineProps, defineEmits, toRefs } from 'vue'

import BaseText from '@/components/UI/BaseText/BaseText.vue'
import themeMixin from '@/mixins/themeMixin'
import { mapMutations } from '@/hooks/useVuex'

const { 'auth/setModalOpen': setModalOpen, 'auth/setModalType': setModalType } = mapMutations()
const { palette } = themeMixin()

const emit = defineEmits(['hidePopup'])

const props: {
  isPopupVisible: boolean
  popupLeft: number
  popupTop: number
} = defineProps<{
  isPopupVisible: boolean
  popupLeft: number
  popupTop: number
}>()

const { isPopupVisible }: any = toRefs(props)

const hidePopup = () => {
  emit('hidePopup', false)
}
const handleDeleteRepo = () => {
  setModalType('delete')
  setModalOpen(true)
  hidePopup()
}

const handleEditRepo = () => {
  setModalType('edit')
  setModalOpen(true)
  hidePopup()
}
</script>

<template>
  <transition name="fade">
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
              <BaseText @click="handleDeleteRepo" class="main-regular" type="p">{{
                $t('delete')
              }}</BaseText>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </transition>
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
