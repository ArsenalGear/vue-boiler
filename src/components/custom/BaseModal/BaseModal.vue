<script setup lang="ts">
import { defineEmits, defineProps, toRefs } from 'vue'

import FormButton from '@/components/UI/FormButton/FormButton.vue'
import BaseText from '@/components/UI/BaseText/BaseText.vue'
import { mapGetters, mapMutations } from '@/hooks/useVuex'
import themeMixin from '@/mixins/themeMixin'

const { 'auth/getIsModalOpen': getIsModalOpen } = mapGetters()
const { 'auth/setModalOpen': setModalOpen } = mapMutations()

const { palette } = themeMixin()
const emit = defineEmits(['handleSaveModal'])

const hidePopup = () => {
  emit('handleSaveModal')
}
const props: { title: string; disabled?: boolean } = defineProps<{
  title: string
  disabled: boolean
}>()
const { title, disabled }: any = toRefs(props)
</script>

<template>
  <div v-if="getIsModalOpen" class="overlay-modal">
    <div class="modal-wrapper">
      <div class="modal-header">
        <BaseText type="h3">{{ title }}</BaseText>
        <span class="close" @click="setModalOpen(false)">&times;</span>
      </div>
      <div class="modal-body">
        <slot></slot>
      </div>
      <div class="modal-footer">
        <FormButton class="cancel" type="button" @click="setModalOpen(false)"
          >{{ $t('cancel') }}
        </FormButton>
        <FormButton :disabled="disabled" type="button" @click="hidePopup"
          >{{ $t('save') }}
        </FormButton>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '@/assets/styles/functions';
.overlay-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 11;

  & .modal-wrapper {
    position: relative;
    min-width: rem(400);
    padding: rem(20);
    background-color: v-bind('palette.paperBackground');
    box-shadow: rgba(0, 0, 0, 0.2) 0 11px 15px -7px, rgba(0, 0, 0, 0.14) 0px 24px 38px 3px,
      rgba(0, 0, 0, 0.12) 0px 9px 46px 8px;
    border-radius: rem(16);

    & .close {
      position: absolute;
      top: 14px;
      right: 10px;
      font-size: rem(30);
      padding: 3px 12px 3px 13px;
      cursor: pointer;
      color: v-bind('palette.paginationTextColor');
      &:hover {
        background: rgba(0, 0, 0, 0.04);
        border-radius: 50%;
      }
    }

    & .modal-body {
      padding: rem(20) 0;
      min-height: rem(100);
    }

    & .modal-footer {
      display: flex;
      justify-content: flex-end;
      gap: rem(16);
    }
  }
}
</style>
