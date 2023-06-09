<script lang="ts" setup>
import { ref, reactive, defineProps, onMounted, onBeforeUnmount, watch } from 'vue'

import BaseSvg from '@/components/custom/BaseSvg/BaseSvg.vue'
import { PPO } from '@/assets/images/imageConstants'
import BaseText from '@/components/UI/BaseText/BaseText.vue'
import BasePaper from '@/components/custom/BasePaper/BasePaper.vue'
import { menuList } from '@/components/custom/BaseMenuBlock/constants'
import { getInitialTheme, handleThemeChange } from '@/hooks/useTheme'
import { mapGetters } from '@/hooks/useVuex'

type TMenuBlock = { title: string }
const props = defineProps<TMenuBlock>()

const activeItem = reactive({ activeIndex: null })
const palette = reactive(getInitialTheme())
const { getTheme } = mapGetters()
const contentRefs = ref<HTMLElement[]>([])

function toggleAccordion(index: any) {
  if (activeItem.activeIndex === index) {
    activeItem.activeIndex = null
  } else {
    activeItem.activeIndex = index
  }
}

function getContentStyle(index: number) {
  return {
    maxHeight: activeItem.activeIndex === index ? `${contentRefs.value[index].scrollHeight}px` : '0'
  }
}

onMounted(() => {
  contentRefs.value = Array.from(document.querySelectorAll('.accordion-content'))
})

onBeforeUnmount(() => {
  contentRefs.value = []
})

watch(
  () => getTheme.value,
  () => handleThemeChange(palette)
)
</script>

<template>
  <div class="menu-block">
    <BaseText type="h2">{{ $t(props.title) }}</BaseText>
    <BasePaper :style="{ height: 'unset' }">
      <div class="menu-block__inner">
        <div class="accordion">
          <div v-for="(item, index) in menuList" :key="index" class="accordion-item">
            <div class="accordion-header" @click="toggleAccordion(index)">
              <div class="accordion__item-wrapper">
                <BaseSvg
                  :width="`24`"
                  :height="`24`"
                  :icon-path="PPO"
                  :icon-color="palette.iconColor"
                />
                <BaseText style="margin-bottom: 2px" type="p">{{ item.title }}</BaseText>
              </div>

              <span
                :class="{
                  'arrow-down': activeItem.activeIndex === index,
                  'arrow-right': activeItem.activeIndex !== index
                }"
              ></span>
            </div>
            <div
              :ref="'content-' + index"
              class="accordion-content"
              :style="getContentStyle(index)"
            >
              <BaseText
                v-for="(section, indexSection) in item.content"
                :key="indexSection"
                type="p"
                >{{ section }}</BaseText
              >
            </div>
          </div>
        </div>
      </div>
    </BasePaper>
  </div>
</template>

<style lang="scss">
@import '@/assets/styles/functions';

.menu-block {
  min-width: 20rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all 0.5s ease 0s;

  &__inner {
    padding: 0 1.5rem;
  }
}

.accordion {
  &-header {
    width: 100%;
    justify-content: space-between;
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  &__item-wrapper {
    display: flex;
    align-items: center;
    gap: rem(6);
  }

  & .arrow-down,
  & .arrow-right {
    width: 8px;
    height: 8px;
    margin-bottom: 4px;
    border: solid #19212f;
    opacity: 0.3;
    border-width: 0 1px 1px 0;
    transform: rotate(45deg);
    transition: transform 0.3s ease;
    &:hover {
      opacity: 1;
    }
  }

  & .arrow-right {
    transform: rotate(-45deg);
  }

  &-content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;

    & p {
      margin: 0.5rem 0;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
