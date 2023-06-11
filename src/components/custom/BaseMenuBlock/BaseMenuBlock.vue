<script lang="ts" setup>
import { ref, reactive, defineProps, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute } from 'vue-router'

import BaseSvg from '@/components/custom/BaseSvg/BaseSvg.vue'
import { PPO } from '@/assets/images/imageConstants'
import BaseText from '@/components/UI/BaseText/BaseText.vue'
import BasePaper from '@/components/custom/BasePaper/BasePaper.vue'
import { menuList } from '@/components/custom/BaseMenuBlock/constants'
import { getInitialTheme, handleThemeChange } from '@/hooks/useTheme'
import { mapGetters } from '@/hooks/useVuex'

type TMenuBlock = { title: string }
const props = defineProps<TMenuBlock>()
const route = useRoute()
//todo type reactive
const activeItem = reactive<{ activeIndex: number | null }>({ activeIndex: 0 })
const palette = reactive(getInitialTheme())
const { getTheme } = mapGetters()
const contentRefs = ref<HTMLElement[]>([])

function toggleAccordion(index: number) {
  if (activeItem.activeIndex === index) {
    activeItem.activeIndex = null
  } else {
    activeItem.activeIndex = index
  }
}

function getContentStyle(index: number) {
  return {
    maxHeight:
      activeItem.activeIndex === index ? `${contentRefs.value[index]?.scrollHeight}px` : '0'
  }
}

onMounted(() => {
  contentRefs.value = Array.from(document.querySelectorAll('.accordion-content'))
})

onBeforeUnmount(() => {
  contentRefs.value = []
})

watch(
  () => getTheme,
  () => handleThemeChange(palette),
  { deep: true }
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
                <BaseText style="margin-bottom: 2px" type="p">{{ $t(item.title.name) }}</BaseText>
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
              <router-link
                v-for="(section, indexSection) in item.content"
                :key="indexSection"
                :to="`/${section.name}`"
                :class="{ 'accordion__item-elem': true, active: route.name === section.name }"
              >
                <div class="accordion__label-wrapper">
                  <BaseText :class="'small-text'" type="p">{{ $t(section.name) }}</BaseText>
                </div>
              </router-link>
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
  &__item-elem {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    text-decoration: none;
    width: 100%;
    box-sizing: border-box;
    text-align: left;
    border-radius: 0.5rem;

    &.active {
      background-color: v-bind('palette.menuItemActive');
    }

    &:hover {
      background-color: v-bind('palette.menuItemHover');
    }
  }

  &__label-wrapper {
    background-color: transparent;
    outline: 0;
    border: 0;
    margin: 0;
    border-radius: 0;
    cursor: pointer;
    user-select: none;
    vertical-align: middle;
    appearance: none;
    color: inherit;
    display: flex;
    flex-grow: 1;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    text-decoration: none;
    min-width: 0;
    box-sizing: border-box;
    text-align: left;
    padding: rem(8) rem(16);
    transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }

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
    margin-bottom: rem(4);
    border: solid v-bind('palette.textColor');
    opacity: 0.4;
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
    margin-top: rem(12);
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;

    & p {
      margin: 0.5rem 0;
    }
  }
}
</style>
